import { Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface BlockWrapperProps {
  children: React.ReactNode;
  index: number;
  totalBlocks: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

/**
 * Wrapper for content blocks with move and delete controls
 */
export const BlockWrapper = ({
  children,
  index,
  totalBlocks,
  onMoveUp,
  onMoveDown,
  onDelete,
}: BlockWrapperProps) => {
  const isFirst = index === 0;
  const isLast = index === totalBlocks - 1;

  return (
    <div className="relative flex gap-3">
      {/* Side controls - always visible */}
      <div className="flex flex-col items-center gap-1 pt-2 shrink-0">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1.5 text-text-muted hover:text-accent hover:bg-accent/10 rounded disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          title="Move up"
        >
          <ChevronUp size={16} />
        </button>

        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1.5 text-text-muted hover:text-accent hover:bg-accent/10 rounded disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          title="Move down"
        >
          <ChevronDown size={16} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 text-error/60 hover:text-error hover:bg-error/10 rounded transition-colors"
          title="Delete block"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Block content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};
