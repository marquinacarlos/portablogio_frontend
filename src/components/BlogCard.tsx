import { Link } from 'react-router';

export interface BlogCardBasic {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: Date | string;
  // author: {
  //   name: string;
  //   avatar?: string;
  // };
  // category?: string;
  // tags?: string[];
  // readingTime?: number;
}


interface BlogCardProps {
  post: BlogCardBasic;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <>
      <li className="min-w-0 w-full flex flex-col border border-brand/30 rounded-sm p-1">
        <Link 
          to={{ pathname: '/blog/blog_slug_test'}}
          className="font-extralight text-3xl text-end uppercase text-brand md:text-5xl lg:text-7xl text-balance"
        >
          {post.title}
        </Link>
        <p className="text-xs font-bold text-end">
          {post.excerpt}
        </p>
        <time dateTime={new Date(post.publishedAt).toISOString()}>
					{formatDate(post.publishedAt)}
				</time>

      </li>
    </>
  );
}


// La función formatDate debe retornar string
function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
