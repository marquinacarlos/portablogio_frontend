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
    <div className="relative pl-4 border-l-4 border-orange-400/50">
      {/* Label */}
      <div className="absolute -left-0.5 -top-0.5 bg-neutral-950 px-1">
        <Quote size={14} className="text-orange-400" />
      </div>

      <textarea
        ref={textareaRef}
        value={block.data.text || ""}
        onChange={(e) => onChange({ ...block.data, text: e.target.value })}
        placeholder="Escribe una cita..."
        className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 italic placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors resize-none overflow-hidden"
        rows={2}
      />
    </div>
  );
};
