import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { API_URL } from "../config/api";
import type { BlogPost, ApiResponse, ContentBlock } from "../types";

// =============================================================================
// COMPONENTES PARA RENDERIZAR CONTENT BLOCKS
// =============================================================================

interface BlockProps {
  block: ContentBlock;
}

const HeaderBlock = ({ block }: BlockProps) => {
  const level = block.data.level || 2;
  const text = block.data.text || "";

  const baseStyles = {
    1: "text-3xl font-bold text-brand mt-8 mb-4",
    2: "text-2xl font-bold text-brand mt-6 mb-3",
    3: "text-xl font-semibold text-text-primary mt-5 mb-2",
    4: "text-lg font-semibold text-text-primary mt-4 mb-2",
    5: "text-base font-semibold text-text-primary mt-3 mb-2",
    6: "text-sm font-semibold text-text-primary mt-3 mb-2",
  } as const;

  const className = baseStyles[level as keyof typeof baseStyles] || baseStyles[2];

  switch (level) {
    case 1:
      return <h1 className={className}>{text}</h1>;
    case 3:
      return <h3 className={className}>{text}</h3>;
    case 4:
      return <h4 className={className}>{text}</h4>;
    case 5:
      return <h5 className={className}>{text}</h5>;
    case 6:
      return <h6 className={className}>{text}</h6>;
    default:
      return <h2 className={className}>{text}</h2>;
  }
};

const ParagraphBlock = ({ block }: BlockProps) => {
  return (
    <p className="text-text-primary/90 leading-relaxed mb-4">
      {block.data.text}
    </p>
  );
};

const CodeBlock = ({ block }: BlockProps) => {
  const language = block.data.language || "plaintext";
  const code = block.data.code || "";

  return (
    <div className="my-4 rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-hover border-b border-border">
        <span className="text-xs text-accent font-mono uppercase">
          {language}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          Copiar
        </button>
      </div>
      <pre className="p-4 bg-surface overflow-x-auto">
        <code className="text-sm font-mono text-text-primary/80 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
};

const ImageBlock = ({ block }: BlockProps) => {
  const url = block.data.url || "";
  const caption = block.data.caption;

  return (
    <figure className="my-6">
      <div className="rounded-md overflow-hidden bg-surface-hover">
        <img
          src={url}
          alt={caption || "Imagen del artículo"}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-text-muted italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const VideoBlock = ({ block }: BlockProps) => {
  const url = block.data.url || "";
  const caption = block.data.caption;

  // Detectar si es YouTube o Vimeo
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  let embedUrl = url;
  if (isYouTube) {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/)?.[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (isVimeo) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <figure className="my-6">
      <div className="aspect-video rounded-md overflow-hidden bg-surface-hover">
        <iframe
          src={embedUrl}
          title={caption || "Video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-text-muted italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const QuoteBlock = ({ block }: BlockProps) => {
  return (
    <blockquote className="my-6 pl-4 border-l-4 border-brand italic text-text-primary/80">
      {block.data.text}
    </blockquote>
  );
};

// Componente que renderiza un bloque según su tipo
const ContentBlockRenderer = ({ block }: BlockProps) => {
  switch (block.type) {
    case "header":
      return <HeaderBlock block={block} />;
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "code":
      return <CodeBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "video":
      return <VideoBlock block={block} />;
    case "quote":
      return <QuoteBlock block={block} />;
    default:
      return null;
  }
};

// =============================================================================
// PÁGINA DE DETALLE DEL POST
// =============================================================================

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`${API_URL}/posts/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Artículo no encontrado");
          }
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result: ApiResponse<BlogPost> = await response.json();
        setPost(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el artículo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-text-secondary">Cargando artículo...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="space-y-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
        >
          <ArrowLeft size={18} />
          Volver al blog
        </Link>

        <div className="p-6 bg-error/10 border border-error/30 rounded-md text-center">
          <p className="text-error text-lg font-semibold">{error}</p>
          <p className="text-text-muted mt-2">
            El artículo que buscas no existe o no está disponible.
          </p>
        </div>
      </div>
    );
  }

  // Sin post
  if (!post) {
    return null;
  }

  return (
    <article className="space-y-6">
      {/* Navegación */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Volver al blog
      </Link>

      {/* Header del post */}
      <header className="space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-text-primary/80 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta información */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <time
            dateTime={post.created_at}
            className="flex items-center gap-1.5"
          >
            <Calendar size={16} />
            {formatDate(post.created_at)}
          </time>

          <span className="flex items-center gap-1.5">
            <User size={16} />
            Carlos Marquina
          </span>
        </div>
      </header>

      {/* Imagen de portada */}
      {post.cover_image_url && (
        <div className="aspect-video rounded-md overflow-hidden bg-surface-hover">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Separador */}
      <hr className="border-border/50" />

      {/* Contenido del post */}
      <div className="prose-custom">
        {post.content.map((block) => (
          <ContentBlockRenderer key={block.id} block={block} />
        ))}
      </div>

      {/* Footer del post */}
      <footer className="pt-6 border-t border-border/50 space-y-4">
        <p className="text-text-secondary text-sm">
          ¿Te ha resultado útil este artículo? ¡Compártelo con otros!
        </p>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
        >
          <ArrowLeft size={18} />
          Ver más artículos
        </Link>
      </footer>
    </article>
  );
};
