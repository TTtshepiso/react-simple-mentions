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
