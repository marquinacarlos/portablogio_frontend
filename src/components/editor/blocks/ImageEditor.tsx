import { Image } from "lucide-react";
import type { ContentBlock } from "../../../types";

interface ImageEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const inputClasses =
  "w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors";

/**
 * Editor de bloque de imagen con URL y caption
 */
export const ImageEditor = ({ block, onChange }: ImageEditorProps) => {
  const { url, caption } = block.data;

  return (
    <div className="space-y-3 p-4 bg-surface/30 border border-border-subtle rounded-md">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Image size={16} className="text-accent" />
        Imagen
      </div>

      {/* URL input */}
      <input
        type="url"
        value={url || ""}
        onChange={(e) => onChange({ ...block.data, url: e.target.value })}
        placeholder="URL de la imagen (ej: https://placehold.co/600x400)"
        className={inputClasses}
      />

      {/* Preview */}
      {url && (
        <div className="relative aspect-video max-w-md overflow-hidden rounded border border-border bg-surface-hover">
          <img
            src={url}
            alt={caption || "Preview"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = `
                <div class="flex items-center justify-center h-full text-text-muted text-sm">
                  Error cargando imagen
                </div>
              `;
            }}
          />
        </div>
      )}

      {/* Caption input */}
      <input
        type="text"
        value={caption || ""}
        onChange={(e) => onChange({ ...block.data, caption: e.target.value })}
        placeholder="Descripcion de la imagen (opcional)"
        className={`${inputClasses} text-sm`}
      />
    </div>
  );
};
