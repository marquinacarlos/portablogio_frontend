import { useEffect, useRef } from "react";
import { FileText, Link as LinkIcon, FileImage, Eye } from "lucide-react";
import type { PostStatus } from "../../types";

interface PostMetaFieldsProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  status: PostStatus;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
  onCoverImageUrlChange: (value: string) => void;
  onStatusChange: (value: PostStatus) => void;
  isEditing: boolean;
}

/**
 * Generates a URL-safe slug from a title
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Letters, numbers, spaces and dashes only
    .replace(/\s+/g, "-") // Spaces to dashes
    .replace(/-+/g, "-") // Multiple dashes to one
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
};

const inputClasses =
  "w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors";

const labelClasses = "flex items-center gap-2 text-sm text-text-primary/80";

/**
 * Post metadata fields (title, slug, excerpt, cover, status)
 */
export const PostMetaFields = ({
  title,
  slug,
  excerpt,
  coverImageUrl,
  status,
  onTitleChange,
  onSlugChange,
  onExcerptChange,
  onCoverImageUrlChange,
  onStatusChange,
  isEditing,
}: PostMetaFieldsProps) => {
  const debounceRef = useRef<number | null>(null);
  const slugManuallyEdited = useRef(false);

  // Auto-generate the slug when the title changes (only if not manually edited)
  useEffect(() => {
    if (isEditing || slugManuallyEdited.current) return;

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      const newSlug = generateSlug(title);
      if (newSlug && newSlug !== slug) {
        onSlugChange(newSlug);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [title, slug, onSlugChange, isEditing]);

  const handleSlugChange = (value: string) => {
    slugManuallyEdited.current = true;
    onSlugChange(generateSlug(value));
  };

  return (
    <div className="space-y-4 p-4 bg-surface/30 border border-border-subtle rounded-md">
      {/* Title */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <FileText size={16} className="text-accent" />
          Article title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Write the title..."
          className={inputClasses}
          autoFocus
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <LinkIcon size={16} className="text-accent" />
          Article URL
        </label>
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="article-url"
            className={`${inputClasses} flex-1`}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <Eye size={16} className="text-accent" />
          Summary (optional)
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Short description shown in listings..."
          className={`${inputClasses} resize-none`}
          rows={2}
        />
      </div>

      {/* Cover Image URL */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <FileImage size={16} className="text-accent" />
          Cover image (URL)
        </label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => onCoverImageUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={inputClasses}
        />
        {coverImageUrl && (
          <div className="mt-2 relative aspect-video max-w-xs overflow-hidden rounded border border-border">
            <img
              src={coverImageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className={labelClasses}>Status</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={status === "draft"}
              onChange={() => onStatusChange("draft")}
              className="accent-accent"
            />
            <span className="text-text-primary/80">Draft</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="published"
              checked={status === "published"}
              onChange={() => onStatusChange("published")}
              className="accent-accent"
            />
            <span className="text-text-primary/80">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="archived"
              checked={status === "archived"}
              onChange={() => onStatusChange("archived")}
              className="accent-accent"
            />
            <span className="text-text-primary/80">Archived</span>
          </label>
        </div>
      </div>
    </div>
  );
};
