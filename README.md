# **react-simple-mentions**

https://github.com/user-attachments/assets/1c4fcf2f-01c9-4276-ad45-02f977204c17

A lightweight and customizable React component for handling mentions in text inputs. Perfect for building chat applications, comment sections, or any feature requiring user mentions.

---

## **Features**

- Parse and display mentions in a user-friendly format (e.g., `@username`).
- Insert mentions programmatically.
- Trigger mention suggestions with `@` and capture queries.
- Fully customizable and easy to integrate.
- Supports TypeScript for type safety.

---

## **Installation**

Install the package via NPM:

```bash
npm install react-simple-mentions
```

Or with Yarn:

```bash
yarn add react-simple-mentions
```

---

## **Usage**

Here’s a basic example of how to use the `MentionsInput` component:

### **Basic Example**

```tsx
import React, { useRef, useState } from "react";
import MentionsInput, {
  Mention,
  MentionsInputRef,
} from "react-simple-mentions";

const App = () => {
  const [value, setValue] = useState("");
  const mentionsInputRef = useRef<MentionsInputRef>(null);

  const handleMentionTrigger = (data: { query: string; position: number }) => {
    console.log("Mention triggered:", data);
  };

  const handleInsertMention = () => {
    const mention: Mention = { name: "John Doe", id: "123" };
    mentionsInputRef.current?.insertMention(mention);
  };

  return (
    <div>
      <MentionsInput
        ref={mentionsInputRef}
        value={value}
        onChange={setValue}
        onMentionTrigger={handleMentionTrigger}
        placeholder="Type @ to mention someone..."
        rows={5}
        style={{ width: "100%", padding: "10px" }}
      />
      <button onClick={handleInsertMention}>Insert Mention</button>
    </div>
  );
};

export default App;
```

---

## **Props**

### **MentionsInput Props**

| Prop               | Type                                 | Description                                          |
| ------------------ | ------------------------------------ | ---------------------------------------------------- |
| `value`            | `string`                             | The current value of the input.                      |
| `onChange`         | `(value: string) => void`            | Callback triggered when the input value changes.     |
| `onMentionTrigger` | `(data: MentionTriggerData) => void` | Callback triggered when a mention query is detected. |
| `className`        | `string`                             | Optional CSS class for the input.                    |
| `style`            | `React.CSSProperties`                | Inline styles for the input.                         |
| `placeholder`      | `string`                             | Placeholder text for the input.                      |
| `rows`             | `number`                             | Number of rows for the textarea.                     |
| `disabled`         | `boolean`                            | Disables the input if set to `true`.                 |
| `readOnly`         | `boolean`                            | Makes the input read-only if set to `true`.          |

---

## **API**

### **MentionsInputRef**

The `MentionsInput` component exposes the following methods via its ref:

| Method          | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `insertMention` | Inserts a mention programmatically. Takes a `Mention` object as an argument. |
| `cancelMention` | Cancels the current mention query.                                           |
| `focus`         | Focuses the input programmatically.                                          |

### **MentionTriggerData**

The `onMentionTrigger` callback provides the following data:

| Field          | Type     | Description                                              |
| -------------- | -------- | -------------------------------------------------------- |
| `query`        | `string` | The current query string after the `@` symbol.           |
| `position`     | `number` | The cursor position in the input.                        |
| `mentionStart` | `number` | The starting position of the mention query in the input. |

---

## **Customizing Mentions**

Mentions are stored in the format `@[name](id)` internally but displayed as `@name` in the input. This allows you to easily parse and manage mentions in your application.

### **Parsing Mentions**

You can use the `parseMentions` function to extract mentions from the stored format:

```tsx
const mentions = parseMentions(value);
console.log(mentions);
/*
[
  { name: "John Doe", id: "123", start: 0, end: 15 },
  { name: "Jane Smith", id: "456", start: 16, end: 31 }
]
*/
```

---

## **Styling**

You can style the `MentionsInput` component using the `className` or `style` props. For example:

```tsx
<MentionsInput
  className="custom-mentions-input"
  style={{ border: "1px solid #ccc", borderRadius: "4px" }}
/>
```

---

## **Mentions Picker Example**

Below is a simple example of rendering your own mentions picker component:

```tsx
import React, { useState, useEffect } from "react";
import type { Mention } from "react-simple-mentions";

interface MentionsPickerProps {
  isOpen: boolean;
  query: string;
  onSelect: (mention: Mention) => void;
  onClose: () => void;
  position?: { x: number; y: number };
}

// Mock data for testing
const MOCK_USERS: Mention[] = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Johnson" },
  { id: "4", name: "Alice Brown" },
  { id: "5", name: "Charlie Wilson" },
];

const MentionsPicker: React.FC<MentionsPickerProps> = ({
  isOpen,
  query,
  onSelect,
  onClose,
  position,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter users based on query
  const filteredUsers = MOCK_USERS.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredUsers.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredUsers.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredUsers[selectedIndex]) {
            onSelect(filteredUsers[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredUsers, onSelect, onClose]);

  if (!isOpen || filteredUsers.length === 0) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    top: position ? position.y + 20 : 0,
    left: position ? position.x : 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 1000,
    maxHeight: "200px",
    overflowY: "auto",
    minWidth: "200px",
  };

  return (
    <div style={style}>
      {filteredUsers.map((user, index) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor: index === selectedIndex ? "#f0f0f0" : "white",
            borderBottom:
              index < filteredUsers.length - 1 ? "1px solid #eee" : "none",
          }}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <div style={{ fontWeight: "500" }}>{user.name}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>ID: {user.id}</div>
        </div>
      ))}
    </div>
  );
};

export default MentionsPicker;
```

## **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## **Contributing**

Contributions are welcome! Feel free to open issues or submit pull requests to improve the package.

---

## **Author**

Created by [leojuriolli7](https://github.com/leojuriolli7).
