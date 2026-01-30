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
    <div className="flex flex-wrap items-center gap-2 p-3 bg-surface/50 border border-border-subtle rounded-md">
      <span className="flex items-center gap-2 text-sm text-text-muted mr-2">
        <Plus size={16} className="text-accent" />
        Agregar bloque:
      </span>

      {blockOptions.map(({ type, label, icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onAddBlock(type)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-primary/80 bg-surface-hover/50 border border-border rounded hover:border-accent/50 hover:text-accent transition-colors"
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};
