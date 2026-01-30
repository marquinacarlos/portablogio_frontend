import { useRef, useEffect } from "react";
import { Quote } from "lucide-react";
import type { ContentBlock } from "../../../types";

interface QuoteEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

/**
 * Editor de bloque de cita con estilo visual
 */
export const QuoteEditor = ({ block, onChange }: QuoteEditorProps) => {
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
    <div className="relative pl-4 border-l-4 border-brand/50">
      {/* Label */}
      <div className="absolute -left-0.5 -top-0.5 bg-background px-1">
        <Quote size={14} className="text-brand" />
      </div>

      <textarea
        ref={textareaRef}
        value={block.data.text || ""}
        onChange={(e) => onChange({ ...block.data, text: e.target.value })}
        placeholder="Escribe una cita..."
        className="w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary italic placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors resize-none overflow-hidden"
        rows={2}
      />
    </div>
  );
};
