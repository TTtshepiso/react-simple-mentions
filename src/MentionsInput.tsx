import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from "react";
import { parseMentions } from "./utils/parseMentions";

type Mention = {
  name: string;
  id: string;
};

type ParsedMention = Mention & {
  start: number;
  end: number;
};

type MentionTriggerData = {
  query: string;
  position: number;
  mentionStart: number;
};

type MentionsInputProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "ref" | "value" | "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
  onMentionTrigger?: (data: MentionTriggerData) => void;
  onMentionCancel?: () => void;
};

interface MentionsInputRef {
  insertMention: (mention: Mention) => void;
  cancelMention: () => void;
  focus: () => void;
}

interface CurrentMention {
  start: number;
  end: number;
  query: string;
}

const MentionsInput = forwardRef<MentionsInputRef, MentionsInputProps>(
  (
    { value, onChange, onMentionTrigger, onMentionCancel, ...textareaProps },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [currentMention, setCurrentMention] = useState<CurrentMention | null>(
      null
    );

    // Generate display text by replacing mentions with @name format
    const generateDisplayText = useCallback((text: string): string => {
      return text?.replace(/@\[([^\]]+)\]\([^)]+\)/g, "@$1");
    }, []);

    // Convert display position to storage position
    const displayToStoragePosition = useCallback(
      (displayPos: number, text: string): number => {
        const mentions = parseMentions(text);
        let storagePos = displayPos;

        for (const mention of mentions) {
          const displayMentionLength = mention.name.length + 1; // @name
          const storageMentionLength = mention.end - mention.start;
          const displayMentionStart = mention.start;

          // Find where this mention would appear in display text
          let displayStart = displayMentionStart;
          for (const prevMention of mentions) {
            if (prevMention.start < mention.start) {
              const prevDisplayLength = prevMention.name.length + 1;
              const prevStorageLength = prevMention.end - prevMention.start;
              displayStart -= prevStorageLength - prevDisplayLength;
            }
          }

          if (displayPos > displayStart + displayMentionLength) {
            storagePos += storageMentionLength - displayMentionLength;
          } else if (displayPos > displayStart) {
            // Position is within mention, map to end of mention in storage
            storagePos =
              mention.start +
              storageMentionLength +
              (displayPos - displayStart);
            break;
          }
        }

        return storagePos;
      },
      [parseMentions]
    );

    // Convert storage position to display position
    const storageToDisplayPosition = useCallback(
      (storagePos: number, text: string): number => {
        const mentions = parseMentions(text);
        let displayPos = storagePos;

        for (const mention of mentions) {
          if (storagePos > mention.end) {
            const displayMentionLength = mention.name.length + 1;
            const storageMentionLength = mention.end - mention.start;
            displayPos -= storageMentionLength - displayMentionLength;
          } else if (storagePos >= mention.start) {
            // Position is within mention, map to start of mention in display
            const displayMentionStart =
              mention.start -
              mentions
                .filter((m) => m.start < mention.start)
                .reduce((acc, m) => {
                  const displayLen = m.name.length + 1;
                  const storageLen = m.end - m.start;
                  return acc + storageLen - displayLen;
                }, 0);
            displayPos = displayMentionStart;
            break;
          }
        }

        return displayPos;
      },
      [parseMentions]
    );

    const handleTextChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDisplayText = e.target.value;
        const cursorPos = e.target.selectionStart || 0;

        // Convert display text back to storage format, preserving existing mentions
        let newStorageText = newDisplayText;
        const mentions = parseMentions(value);

        // Replace mentions in display text with storage format
        for (let i = mentions.length - 1; i >= 0; i--) {
          const mention = mentions[i];
          const displayStart = storageToDisplayPosition(mention.start, value);
          const displayEnd = displayStart + mention.name.length + 1;
          const displayMention = `@${mention.name}`;

          if (
            newDisplayText.slice(displayStart, displayEnd) === displayMention
          ) {
            // Mention is intact, preserve it
            newStorageText =
              newStorageText.slice(0, displayStart) +
              `@[${mention.name}](${mention.id})` +
              newStorageText.slice(displayEnd);
          }
        }

        // Determine what the new currentMention should be
        let newCurrentMention: CurrentMention | null = null;

        // Check for new @ mentions
        const atIndex = newDisplayText.lastIndexOf("@", cursorPos - 1);

        if (
          atIndex !== -1 &&
          (atIndex === 0 || /\s/.test(newDisplayText[atIndex - 1]))
        ) {
          const query = newDisplayText.slice(atIndex + 1, cursorPos);
          if (!/\s/.test(query)) {
            const storageAtIndex = displayToStoragePosition(
              atIndex,
              newStorageText
            );

            newCurrentMention = {
              start: storageAtIndex,
              end: storageAtIndex + query.length + 1,
              query,
            };

            onMentionTrigger?.({
              query,
              position: cursorPos,
              mentionStart: atIndex,
            });
          }
        }

        // Detect transition: had mention => no mention
        if (currentMention !== null && newCurrentMention === null) {
          onMentionCancel?.();
        }

        // Update state
        setCurrentMention(newCurrentMention);
        onChange(newStorageText);
      },
      [
        value,
        onChange,
        onMentionTrigger,
        onMentionCancel,
        currentMention,
        parseMentions,
        displayToStoragePosition,
        storageToDisplayPosition,
      ]
    );

    useImperativeHandle(
      ref,
      () => ({
        insertMention: (mention: Mention) => {
          if (!currentMention || !textareaRef.current) return;

          const beforeMention = value.slice(0, currentMention.start);
          const afterMention = value.slice(currentMention.end);

          // Add space here to ensure better UX
          const mentionText = `@[${mention.name}](${mention.id}) `;

          const newValue = beforeMention + mentionText + afterMention;
          onChange(newValue);

          // Position cursor after the mention and space in display text
          // In display text, the mention will appear as "@name "
          // (+1 for @, +1 for space)
          const displayMentionLength = mention.name.length + 2;
          const displayMentionStart = storageToDisplayPosition(
            currentMention.start,
            newValue
          );
          const newCursorPos = displayMentionStart + displayMentionLength;

          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
              textareaRef.current.focus();
            }
          }, 0);

          setCurrentMention(null);
        },

        cancelMention: () => {
          setCurrentMention(null);
        },

        focus: () => {
          textareaRef.current?.focus();
        },
      }),
      [currentMention, value, onChange, storageToDisplayPosition]
    );

    const displayText = generateDisplayText(value);

    return (
      <textarea
        {...textareaProps}
        ref={textareaRef}
        value={displayText}
        onChange={handleTextChange}
      />
    );
  }
);

MentionsInput.displayName = "MentionsInput";

export default MentionsInput;
export type { Mention, ParsedMention, MentionTriggerData, MentionsInputRef };
