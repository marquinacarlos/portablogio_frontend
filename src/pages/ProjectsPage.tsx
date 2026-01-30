import { Code2, ExternalLink } from "lucide-react";
import { List } from "../components/List";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";
import type { Project } from "../types";

const projects: Project[] = [
  {
    id: 1,
    title: "Flowventory",
    url: "https://github.com/marquinacarlos/Flowventory-Mini-Backend",
    description:
      "Una aplicación POS (Point of Sale) para el manejo, gestión y control de inventario para tiendas de cualquier tipo.",
    tech_stack: [
      "JavaScript",
      "React",
      "Supabase",
      "Storage",
      "Auth",
      "SQL",
      "PostgreSQL",
    ],
  },
  {
    id: 2,
    title: "Minitweet",
    url: "https://github.com/marquinacarlos/minitweet",
    description:
      "Una red social inspirada en Reddit y Twitter para compartir ideas, fotos, interactuar con publicaciones y chatear.",
    tech_stack: [
      "JavaScript",
      "Vue",
      "Firebase",
      "Firestore",
      "Auth",
      "NoSQL",
    ],
  },
];

export const ProjectsPage = () => {
  return (
    <>
      <Subtitle>Proyectos</Subtitle>

      {/* Introducción */}
      <section className="space-y-2">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          Una selección de proyectos en los que he trabajado.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          Cada proyecto representa un desafío único donde apliqué diferentes
          tecnologías y patrones de desarrollo.
        </p>
      </section>

      {/* Stats */}
      <section className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-border-subtle rounded-md">
          <Code2 className="text-brand" size={20} />
          <span className="text-text-primary font-semibold">{projects.length}</span>
          <span className="text-text-muted text-sm">proyectos</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-border-subtle rounded-md">
          <ExternalLink className="text-accent" size={20} />
          <span className="text-text-muted text-sm">Click en el título para ver más</span>
        </div>
      </section>

      {/* Lista de proyectos */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Code2 className="text-brand" size={24} />
          Mis proyectos
        </h3>
        <List>
          {projects.map((project) => (
            <List.ProjectCard key={project.id} project={project} />
          ))}
        </List>
      </section>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Cada línea de código es una oportunidad para aprender algo nuevo.
      </Blockquote>

      {/* Cierre */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          ¿Te gustaría ver más proyectos o conocer los detalles técnicos?
          Contáctame y con gusto te cuento más sobre mi trabajo.
        </p>
      </section>
    </>
  );
};
