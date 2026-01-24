import { Code } from "lucide-react";
import type { ContentBlock } from "../../../types";

interface CodeEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "json", label: "JSON" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "text", label: "Texto plano" },
];

/**
 * Editor de bloque de codigo con selector de lenguaje
 */
export const CodeEditor = ({ block, onChange }: CodeEditorProps) => {
  const { code, language } = block.data;

  return (
    <div className="space-y-3 p-4 bg-neutral-900/30 border border-neutral-800 rounded-md">
      {/* Header con label y selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-amber-100/60">
          <Code size={16} className="text-cyan-400" />
          Codigo
        </div>

        <select
          value={language || "javascript"}
          onChange={(e) => onChange({ ...block.data, language: e.target.value })}
          className="px-3 py-1.5 text-sm bg-neutral-800 border border-neutral-700 rounded text-amber-100 focus:outline-none focus:border-cyan-400/50"
        >
          {languageOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Textarea para codigo */}
      <textarea
        value={code || ""}
        onChange={(e) => onChange({ ...block.data, code: e.target.value })}
        placeholder="Escribe o pega tu codigo aqui..."
        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-md text-amber-100 font-mono text-sm placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors resize-y min-h-[120px]"
        rows={6}
        spellCheck={false}
      />
    </div>
  );
};
