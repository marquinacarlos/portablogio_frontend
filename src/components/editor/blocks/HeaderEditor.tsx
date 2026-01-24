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
        <span className="text-xs text-amber-100/50">Nivel:</span>
        <div className="flex gap-1">
          {levelOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ ...block.data, level: option.value })}
              className={`px-2 py-1 text-xs rounded border transition-colors ${
                level === option.value
                  ? "bg-cyan-400/20 border-cyan-400/50 text-cyan-400"
                  : "bg-neutral-800/50 border-neutral-700 text-amber-100/60 hover:border-neutral-600"
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
        className={`w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 font-bold placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors ${textSizeClasses[level]}`}
      />
    </div>
  );
};
