"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const CustomTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Execute formatting command
  const execFormatCommand = (command, value = null) => {
    editorRef.current.focus();

    // Force proper block formatting to allow lists to work
    if (command === "insertUnorderedList" || command === "insertOrderedList") {
      document.execCommand("formatBlock", false, "div");
    }

    document.execCommand(command, false, value);
    updateActiveFormats();
    triggerChange();
  };

  // Update toolbar state
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  // Handle changes
  const triggerChange = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Sanitize pasted content
  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData(
      "text/plain"
    );
    document.execCommand("insertText", false, text);
    triggerChange();
  };

  // Cursor to end on focus if empty
  const handleFocus = () => {
    const el = editorRef.current;
    if (el && el.textContent === "") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  // Set initial value
  useEffect(() => {
    if (
      editorRef.current &&
      value !== undefined &&
      value !== editorRef.current.innerHTML
    ) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-md bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <FormatButton
          label="Bold"
          icon="B"
          active={activeFormats.bold}
          onClick={() => execFormatCommand("bold")}
        />
        <FormatButton
          label="Italic"
          icon="I"
          active={activeFormats.italic}
          onClick={() => execFormatCommand("italic")}
        />
        <FormatButton
          label="Underline"
          icon="U"
          active={activeFormats.underline}
          onClick={() => execFormatCommand("underline")}
        />
        <FormatButton
          label="Bullet List"
          icon="•"
          onClick={() => execFormatCommand("insertUnorderedList")}
        />
        <FormatButton
          label="Numbered List"
          icon="1."
          onClick={() => execFormatCommand("insertOrderedList")}
        />
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        spellCheck={true}
        autoCorrect="on"
        autoCapitalize="sentences"
        className="h-[350px] p-3 outline-none whitespace-pre-wrap break-words overflow-y-scroll"
        onInput={triggerChange}
        onPaste={handlePaste}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onFocus={handleFocus}
        suppressContentEditableWarning
      />
    </div>
  );
};

// Toolbar Button component
const FormatButton = ({ label, icon, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded transition hover:bg-gray-200 ${
      active ? "bg-gray-200 text-blue-600" : ""
    }`}
    title={label}
  >
    <span className="font-semibold">{icon}</span>
  </button>
);

export default CustomTextEditor;
