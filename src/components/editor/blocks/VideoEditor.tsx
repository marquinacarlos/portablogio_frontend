import { Video } from "lucide-react";
import type { ContentBlock } from "../../../types";

interface VideoEditorProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const inputClasses =
  "w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors";

/**
 * Extracts the video ID from a YouTube URL
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
 * Video block editor with URL and caption
 */
export const VideoEditor = ({ block, onChange }: VideoEditorProps) => {
  const { url, caption } = block.data;
  const youtubeId = url ? getYouTubeId(url) : null;

  return (
    <div className="space-y-3 p-4 bg-surface/30 border border-border-subtle rounded-md">
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Video size={16} className="text-accent" />
        Video (YouTube)
      </div>

      {/* URL input */}
      <input
        type="url"
        value={url || ""}
        onChange={(e) => onChange({ ...block.data, url: e.target.value })}
        placeholder="Video URL (e.g.: https://www.youtube.com/watch?v=...)"
        className={inputClasses}
      />

      {/* Preview */}
      {youtubeId && (
        <div className="relative aspect-video max-w-md overflow-hidden rounded border border-border bg-surface-hover">
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
        <div className="p-4 bg-warning/10 border border-warning/30 rounded text-sm text-warning">
          Only YouTube videos are supported. Make sure to use a valid URL.
        </div>
      )}

      {/* Caption input */}
      <input
        type="text"
        value={caption || ""}
        onChange={(e) => onChange({ ...block.data, caption: e.target.value })}
        placeholder="Video description (optional)"
        className={`${inputClasses} text-sm`}
      />
    </div>
  );
};
