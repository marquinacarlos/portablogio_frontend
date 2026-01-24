import { Video } from "lucide-react";
import type { ContentBlock } from "../../../types";

interface VideoEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const inputClasses =
  "w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors";

/**
 * Extrae el ID de video de una URL de YouTube
 */
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /youtube\.com\/shorts\/([^&?/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

/**
 * Editor de bloque de video con URL y caption
 */
export const VideoEditor = ({ block, onChange }: VideoEditorProps) => {
  const { url, caption } = block.data;
  const youtubeId = url ? getYouTubeId(url) : null;

  return (
    <div className="space-y-3 p-4 bg-neutral-900/30 border border-neutral-800 rounded-md">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-amber-100/60">
        <Video size={16} className="text-cyan-400" />
        Video (YouTube)
      </div>

      {/* URL input */}
      <input
        type="url"
        value={url || ""}
        onChange={(e) => onChange({ ...block.data, url: e.target.value })}
        placeholder="URL del video (ej: https://www.youtube.com/watch?v=...)"
        className={inputClasses}
      />

      {/* Preview */}
      {youtubeId && (
        <div className="relative aspect-video max-w-md overflow-hidden rounded border border-neutral-700 bg-neutral-800">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Video preview"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {url && !youtubeId && (
        <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded text-sm text-amber-400">
          Solo se soportan videos de YouTube. Asegurate de usar una URL valida.
        </div>
      )}

      {/* Caption input */}
      <input
        type="text"
        value={caption || ""}
        onChange={(e) => onChange({ ...block.data, caption: e.target.value })}
        placeholder="Descripcion del video (opcional)"
        className={`${inputClasses} text-sm`}
      />
    </div>
  );
};
