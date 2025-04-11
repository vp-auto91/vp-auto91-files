"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const CustomTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Format command executor
  const execFormatCommand = (command, value = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    updateActiveFormats();
    triggerChange();
  };

  // Detect current format state
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  // Sync content to parent
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

  // Focus caret at end if empty
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

  // Initialize value
  useEffect(() => {
    if (
      editorRef.current &&
      value !== undefined &&
      value !== editorRef.current.innerHTML
    ) {
      editorRef.current.innerHTML = value || "";
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

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        spellCheck={true}
        autoCorrect="on"
        autoCapitalize="sentences"
        className="min-h-[150px] p-3 outline-none whitespace-pre-wrap break-words"
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

// Toolbar Button Component
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

// <div className="mb-3">
//   <label className="block text-sm font-medium text-gray-700">
//     Description
//   </label>
//   <textarea
//     className="w-full p-2 border border-gray-300 rounded-md"
//     {...register("description", { required: true })}
//   />
//   {errors.description && (
//     <span className="text-red-500 text-sm">This field is required</span>
//   )}
// </div>
