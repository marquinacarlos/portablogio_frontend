import { useRef, useEffect } from "react";
import type { ContentBlock } from "../../../types";

interface ParagraphEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

/**
 * Paragraph block editor with an auto-resizing textarea
 */
export const ParagraphEditor = ({ block, onChange }: ParagraphEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [block.data.text]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={block.data.text || ""}
        onChange={(e) => onChange({ ...block.data, text: e.target.value })}
        placeholder="Write a paragraph..."
        className="w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors resize-none overflow-hidden"
        rows={1}
      />
      <span className="absolute top-3 right-3 text-xs text-text-muted">
        Paragraph
      </span>
    </div>
  );
};
