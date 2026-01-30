import type { ContentBlock } from "../../../types";

interface HeaderEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const levelOptions = [
  { value: 1, label: "H1" },
  { value: 2, label: "H2" },
  { value: 3, label: "H3" },
  { value: 4, label: "H4" },
  { value: 5, label: "H5" },
  { value: 6, label: "H6" },
];

/**
 * Editor de bloque de titulo con selector de nivel
 */
export const HeaderEditor = ({ block, onChange }: HeaderEditorProps) => {
  const level = block.data.level || 2;

  // Tamanos de texto segun nivel
  const textSizeClasses: Record<number, string> = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
  };

  return (
    <div className="space-y-2">
      {/* Selector de nivel */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted">Nivel:</span>
        <div className="flex gap-1">
          {levelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ ...block.data, level: option.value })}
              className={`px-2 py-1 text-xs rounded border transition-colors ${
                level === option.value
                  ? "bg-accent/20 border-accent/50 text-accent"
                  : "bg-surface-hover/50 border-border text-text-secondary hover:border-border"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input de titulo */}
      <input
        type="text"
        value={block.data.text || ""}
        onChange={(e) => onChange({ ...block.data, text: e.target.value })}
        placeholder="Escribe un titulo..."
        className={`w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary font-bold placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors ${textSizeClasses[level]}`}
      />
    </div>
  );
};
