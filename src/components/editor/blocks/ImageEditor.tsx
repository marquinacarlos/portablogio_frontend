import { Image } from "lucide-react";
import type { ContentBlock } from "../../../types";

interface ImageEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const inputClasses =
  "w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors";

/**
 * Editor de bloque de imagen con URL y caption
 */
export const ImageEditor = ({ block, onChange }: ImageEditorProps) => {
  const { url, caption } = block.data;

  return (
    <div className="space-y-3 p-4 bg-neutral-900/30 border border-neutral-800 rounded-md">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-amber-100/60">
        <Image size={16} className="text-cyan-400" />
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
        <div className="relative aspect-video max-w-md overflow-hidden rounded border border-neutral-700 bg-neutral-800">
          <img
            src={url}
            alt={caption || "Preview"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = `
                <div class="flex items-center justify-center h-full text-amber-100/50 text-sm">
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
