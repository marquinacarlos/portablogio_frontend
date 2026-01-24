import {
  Type,
  Heading,
  Image,
  Code,
  Video,
  Quote,
  Plus,
} from "lucide-react";
import type { BlockType } from "../../types";

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void;
}

const blockOptions: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: "paragraph", label: "Parrafo", icon: <Type size={16} /> },
  { type: "header", label: "Titulo", icon: <Heading size={16} /> },
  { type: "image", label: "Imagen", icon: <Image size={16} /> },
  { type: "code", label: "Codigo", icon: <Code size={16} /> },
  { type: "video", label: "Video", icon: <Video size={16} /> },
  { type: "quote", label: "Cita", icon: <Quote size={16} /> },
];

/**
 * Barra de herramientas para agregar nuevos bloques de contenido
 */
export const BlockToolbar = ({ onAddBlock }: BlockToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-neutral-900/50 border border-neutral-800 rounded-md">
      <span className="flex items-center gap-2 text-sm text-amber-100/60 mr-2">
        <Plus size={16} className="text-cyan-400" />
        Agregar bloque:
      </span>

      {blockOptions.map(({ type, label, icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onAddBlock(type)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-amber-100/80 bg-neutral-800/50 border border-neutral-700 rounded hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};
