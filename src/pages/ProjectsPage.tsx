import { Code2, ExternalLink } from "lucide-react";
import { List } from "../components/List";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";
import type { Project } from "../types";

const projects: Project[] = [
  {
    id: 1,
    title: "IMeet",
    url: "https://imeet-platform.netlify.app/",
    repo_url: "https://github.com/SlotsForMentoring/Slots",
    description:
      "Final project, MigraCode bootcamp. Tech Lead of a team of 4: led the group from architecture to deployment, built the backend with Python, FastAPI and PostgreSQL, and connected it to Google Calendar and Meet so each booking creates the session automatically. Discontinued; redeployed as a demo.",
    tech_stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "TailwindCSS",
      "Google OAuth",
    ],
    date: "June 2026 - July 2026",
  },
  {
    id: 2,
    title: "Minitweet",
    url: "https://minitweet.netlify.app/",
    repo_url: "https://github.com/marquinacarlos/minitweet",
    description:
      "Vue course project, Escuela Da Vinci. Solo developer: a Reddit-inspired social network with Vue and Firebase, with my own authentication and authorization system, real-time comments and private chat. Installable PWA.",
    tech_stack: [
      "JavaScript",
      "Vue",
      "Firebase",
      "Firestore",
      "PWA",
    ],
    date: "September 2024 - December 2024",
  },
  {
    id: 3,
    title: "Flowventory",
    url: "https://github.com/marquinacarlos/Flowventory-Mini-Backend",
    repo_url: "https://github.com/marquinacarlos/Flowventory-Mini-Backend",
    description:
      "A point-of-sale (POS) application to manage, handle and control inventory for stores of any kind.",
    tech_stack: [
      "JavaScript",
      "React",
      "Supabase",
      "SQL",
      "PostgreSQL",
    ],
    date: "In development",
    inDevelopment: true,
  },
];

export const ProjectsPage = () => {
  return (
    <>
      <Subtitle>Projects</Subtitle>

      {/* Introduction */}
      <section className="space-y-2">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          A selection of projects I've worked on.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          Each project was a real challenge where I applied different
          technologies and development practices.
        </p>
      </section>

      {/* Stats */}
      <section className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-border-subtle rounded-md">
          <Code2 className="text-brand" size={20} />
          <span className="text-text-primary font-semibold">{projects.length}</span>
          <span className="text-text-muted text-sm">projects</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border border-border-subtle rounded-md">
          <ExternalLink className="text-accent" size={20} />
          <span className="text-text-muted text-sm">Click the title to see more</span>
        </div>
      </section>

      {/* Project list */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Code2 className="text-brand" size={24} />
          My projects
        </h3>
        <List>
          {projects.map((project) => (
            <List.ProjectCard key={project.id} project={project} />
          ))}
        </List>
      </section>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Every line of code is a chance to learn something new.
      </Blockquote>

      {/* Closing */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          Would you like to see more projects or hear the technical details?
          Contact me and I'll gladly tell you more about my work.
        </p>
      </section>
    </>
  );
};
