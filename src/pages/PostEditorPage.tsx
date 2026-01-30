import { useReducer, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import {
  PostMetaFields,
  BlockToolbar,
  BlockWrapper,
  ParagraphEditor,
  HeaderEditor,
  ImageEditor,
  CodeEditor,
  VideoEditor,
  QuoteEditor,
} from "../components/editor";
import { postService } from "../services/postService";
import { useAuthStore } from "../store/authStore";
import type { ContentBlock, BlockType, PostStatus } from "../types";

// =============================================================================
// Types
// =============================================================================

interface EditorState {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  status: PostStatus;
  blocks: ContentBlock[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  hasUnsavedChanges: boolean;
}

type EditorAction =
  | { type: "SET_META"; field: keyof Pick<EditorState, "title" | "slug" | "excerpt" | "coverImageUrl">; value: string }
  | { type: "SET_STATUS"; status: PostStatus }
  | { type: "ADD_BLOCK"; blockType: BlockType }
  | { type: "UPDATE_BLOCK"; id: string; data: ContentBlock["data"] }
  | { type: "DELETE_BLOCK"; id: string }
  | { type: "MOVE_BLOCK"; id: string; direction: "up" | "down" }
  | { type: "LOAD_POST"; post: EditorState }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_SAVING"; isSaving: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "MARK_SAVED" };

// =============================================================================
// Helpers
// =============================================================================

const generateBlockId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

const createEmptyBlock = (type: BlockType): ContentBlock => {
  const base = { id: generateBlockId(), type };

  switch (type) {
    case "header":
      return { ...base, data: { text: "", level: 2 } };
    case "code":
      return { ...base, data: { code: "", language: "javascript" } };
    case "image":
    case "video":
      return { ...base, data: { url: "", caption: "" } };
    case "paragraph":
    case "quote":
    default:
      return { ...base, data: { text: "" } };
  }
};

const initialState: EditorState = {
  title: "",
  slug: "",
  excerpt: "",
  coverImageUrl: "",
  status: "draft",
  blocks: [createEmptyBlock("paragraph")],
  isLoading: false,
  isSaving: false,
  error: null,
  hasUnsavedChanges: false,
};

// =============================================================================
// Reducer
// =============================================================================

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "SET_META":
      return { ...state, [action.field]: action.value, hasUnsavedChanges: true };

    case "SET_STATUS":
      return { ...state, status: action.status, hasUnsavedChanges: true };

    case "ADD_BLOCK":
      return {
        ...state,
        blocks: [...state.blocks, createEmptyBlock(action.blockType)],
        hasUnsavedChanges: true,
      };

    case "UPDATE_BLOCK":
      return {
        ...state,
        blocks: state.blocks.map((block) =>
          block.id === action.id ? { ...block, data: action.data } : block
        ),
        hasUnsavedChanges: true,
      };

    case "DELETE_BLOCK": {
      const newBlocks = state.blocks.filter((block) => block.id !== action.id);
      // Si se elimina el ultimo bloque, agregar uno vacio
      if (newBlocks.length === 0) {
        newBlocks.push(createEmptyBlock("paragraph"));
      }
      return {
        ...state,
        blocks: newBlocks,
        hasUnsavedChanges: true,
      };
    }

    case "MOVE_BLOCK": {
      const index = state.blocks.findIndex((b) => b.id === action.id);
      if (index === -1) return state;

      const newIndex = action.direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= state.blocks.length) return state;

      const newBlocks = [...state.blocks];
      [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];

      return { ...state, blocks: newBlocks, hasUnsavedChanges: true };
    }

    case "LOAD_POST":
      return { ...action.post, isLoading: false, isSaving: false, error: null, hasUnsavedChanges: false };

    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };

    case "SET_SAVING":
      return { ...state, isSaving: action.isSaving };

    case "SET_ERROR":
      return { ...state, error: action.error, isLoading: false, isSaving: false };

    case "MARK_SAVED":
      return { ...state, hasUnsavedChanges: false };

    default:
      return state;
  }
};

// =============================================================================
// Block Renderer Component
// =============================================================================

interface BlockRendererProps {
  block: ContentBlock;
  onChange: (data: ContentBlock["data"]) => void;
}

const BlockRenderer = ({ block, onChange }: BlockRendererProps) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphEditor block={block} onChange={onChange} />;
    case "header":
      return <HeaderEditor block={block} onChange={onChange} />;
    case "image":
      return <ImageEditor block={block} onChange={onChange} />;
    case "code":
      return <CodeEditor block={block} onChange={onChange} />;
    case "video":
      return <VideoEditor block={block} onChange={onChange} />;
    case "quote":
      return <QuoteEditor block={block} onChange={onChange} />;
    default:
      return <div className="text-error">Tipo de bloque desconocido: {block.type}</div>;
  }
};

// =============================================================================
// Main Component
// =============================================================================

export const PostEditorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const isEditing = Boolean(slug);

  // Cargar post si estamos editando
  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      dispatch({ type: "SET_LOADING", isLoading: true });

      try {
        const post = await postService.getBySlug(slug);
        dispatch({
          type: "LOAD_POST",
          post: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            coverImageUrl: post.cover_image_url || "",
            status: post.status,
            blocks: post.content.length > 0 ? post.content : [createEmptyBlock("paragraph")],
            isLoading: false,
            isSaving: false,
            error: null,
            hasUnsavedChanges: false,
          },
        });
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          error: err instanceof Error ? err.message : "Error al cargar el post",
        });
      }
    };

    loadPost();
  }, [slug]);

  // Advertir sobre cambios sin guardar al salir
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state.hasUnsavedChanges]);

  // Validar antes de guardar
  const validatePost = (): string | null => {
    if (state.title.trim().length < 3) {
      return "El titulo debe tener al menos 3 caracteres";
    }

    if (!state.slug.trim()) {
      return "El slug es obligatorio";
    }

    const hasContent = state.blocks.some((block) => {
      const data = block.data;
      return (data.text && data.text.trim()) || (data.code && data.code.trim()) || data.url;
    });

    if (!hasContent) {
      return "El post debe tener al menos un bloque con contenido";
    }

    return null;
  };

  // Guardar post
  const handleSave = useCallback(async () => {
    const validationError = validatePost();
    if (validationError) {
      dispatch({ type: "SET_ERROR", error: validationError });
      return;
    }

    dispatch({ type: "SET_SAVING", isSaving: true });
    dispatch({ type: "SET_ERROR", error: null });

    try {
      const postData = {
        user_id: user?.id || 1,
        title: state.title.trim(),
        slug: state.slug.trim(),
        excerpt: state.excerpt.trim() || undefined,
        content: state.blocks,
        cover_image_url: state.coverImageUrl.trim() || undefined,
        status: state.status,
      };

      if (isEditing && slug) {
        // Actualizar post existente
        await postService.update(slug, postData);
        dispatch({ type: "MARK_SAVED" });
      } else {
        // Crear nuevo post
        const newPost = await postService.create(postData);
        dispatch({ type: "MARK_SAVED" });
        // Redirigir al modo edicion
        navigate(`/admin/posts/${newPost.slug}/edit`, { replace: true });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al guardar el post";
      dispatch({ type: "SET_ERROR", error: message });
    } finally {
      dispatch({ type: "SET_SAVING", isSaving: false });
    }
  }, [state, user, isEditing, slug, navigate]);

  // Loading inicial
  if (state.isLoading) {
    return (
      <>
        <Subtitle>{isEditing ? "Editar articulo" : "Nuevo articulo"}</Subtitle>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <span className="ml-3 text-text-secondary">Cargando...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Subtitle>{isEditing ? "Editar articulo" : "Nuevo articulo"}</Subtitle>

      {/* Barra de acciones */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            if (state.hasUnsavedChanges) {
              if (!confirm("Tienes cambios sin guardar. ¿Seguro que quieres salir?")) {
                return;
              }
            }
            navigate("/admin");
          }}
          className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft size={18} />
          Volver al panel
        </button>

        <div className="flex items-center gap-3">
          {state.hasUnsavedChanges && (
            <span className="text-sm text-warning">Cambios sin guardar</span>
          )}

          <button
            onClick={handleSave}
            disabled={state.isSaving}
            className="flex items-center justify-center whitespace-nowrap py-2 px-4 bg-accent text-background font-medium rounded-md gap-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state.isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Guardar
          </button>
        </div>
      </section>

      {/* Error */}
      {state.error && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-md">
          <p className="text-error">{state.error}</p>
        </div>
      )}

      {/* Metadatos */}
      <PostMetaFields
        title={state.title}
        slug={state.slug}
        excerpt={state.excerpt}
        coverImageUrl={state.coverImageUrl}
        status={state.status}
        onTitleChange={(value) => dispatch({ type: "SET_META", field: "title", value })}
        onSlugChange={(value) => dispatch({ type: "SET_META", field: "slug", value })}
        onExcerptChange={(value) => dispatch({ type: "SET_META", field: "excerpt", value })}
        onCoverImageUrlChange={(value) => dispatch({ type: "SET_META", field: "coverImageUrl", value })}
        onStatusChange={(status) => dispatch({ type: "SET_STATUS", status })}
        isEditing={isEditing}
      />

      {/* Contenido - Bloques */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">Contenido</h3>

        <div className="space-y-4">
          {state.blocks.map((block, index) => (
            <BlockWrapper
              key={block.id}
              index={index}
              totalBlocks={state.blocks.length}
              onMoveUp={() => dispatch({ type: "MOVE_BLOCK", id: block.id, direction: "up" })}
              onMoveDown={() => dispatch({ type: "MOVE_BLOCK", id: block.id, direction: "down" })}
              onDelete={() => dispatch({ type: "DELETE_BLOCK", id: block.id })}
            >
              <BlockRenderer
                block={block}
                onChange={(data) => dispatch({ type: "UPDATE_BLOCK", id: block.id, data })}
              />
            </BlockWrapper>
          ))}
        </div>

        {/* Toolbar para agregar bloques */}
        <BlockToolbar
          onAddBlock={(blockType) => dispatch({ type: "ADD_BLOCK", blockType })}
        />
      </section>

      {/* Info */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-muted text-sm">
          Usa los controles a la izquierda de cada bloque para reordenar o eliminar.
          Selecciona el estado del post (borrador, publicado, archivado) y presiona "Guardar".
        </p>
      </section>
    </>
  );
};
