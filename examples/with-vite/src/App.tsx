import React, { useState, useRef } from "react";
import {
  MentionsInput,
  type MentionsInputRef,
  type MentionTriggerData,
} from "../../../src";
import MentionsPicker from "./MentionsPicker";

const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [mentionTrigger, setMentionTrigger] =
    useState<MentionTriggerData | null>(null);
  const mentionsInputRef = useRef<MentionsInputRef>(null);

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <h1>react-simple-mentions</h1>

      <p>
        Dead-simple, customizable mentions input built with React and
        Typescript.
      </p>

      <MentionsInput
        ref={mentionsInputRef}
        value={value}
        onChange={setValue}
        onMentionTrigger={setMentionTrigger}
        onMentionCancel={() => setMentionTrigger(null)}
        placeholder="Type @ to mention someone..."
        rows={4}
        style={{ width: "100%", padding: "8px", fontSize: "14px" }}
      />

      <MentionsPicker
        isOpen={!!mentionTrigger}
        query={mentionTrigger?.query || ""}
        onSelect={(mention) => {
          mentionsInputRef.current?.insertMention(mention);
          setMentionTrigger(null);
        }}
        onClose={() => {
          mentionsInputRef.current?.cancelMention();
          setMentionTrigger(null);
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Storage Value:</h3>
        <pre>{value}</pre>
      </div>
    </div>
  );
};

export default App;
