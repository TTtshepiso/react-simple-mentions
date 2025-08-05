import type { ParsedMention } from "@/MentionsInput";

/**
 * This function receives a string and will parse and return all the
 * mentions (Must be formatted as `@[name](id)`) inside that text.
 */
export const parseMentions = (text: string): ParsedMention[] => {
  const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
  const mentions: ParsedMention[] = [];
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push({
      name: match[1],
      id: match[2],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return mentions;
};
