import { useRef, useEffect } from "react";
import type { ContentBlock } from "../../../types";

interface ParagraphEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

/**
 * Editor de bloque de parrafo con textarea auto-resize
 */
export const ParagraphEditor = ({ block, onChange }: ParagraphEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize del textarea
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
        placeholder="Escribe un parrafo..."
        className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors resize-none overflow-hidden"
        rows={1}
      />
      <span className="absolute top-3 right-3 text-xs text-amber-100/30">
        Parrafo
      </span>
    </div>
  );
};
