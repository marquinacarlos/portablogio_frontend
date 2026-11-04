import { Link } from "react-router";
import { Github, Linkedin, Mail, Code2, Briefcase, ArrowRight } from "lucide-react";
import { Blockquote } from "../components/Blockquote";
import { ButtonWithIcon, DownloadButton } from "../components/ButtonWithIcon";

const technologies = [
  { name: "PostgreSQL", category: "database" },
  { name: "Express", category: "backend" },
  { name: "React", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "GitHub", category: "tools" },
];

const email = "contact@carlosmarquina.dev";
const subject = "Hello Carlos";
const body = "Hi Carlos,\n\nI'm [YOUR NAME] and I'm reaching out because...";

const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


const socialLinks = [
  {
    icon: <Github strokeWidth={1.5} size={24} />,
    href: "https://github.com/marquinacarlos",
    label: "GitHub",
  },
  {
    icon: <Linkedin strokeWidth={1.5} size={24} />,
    href: "https://www.linkedin.com/in/marquinacarlos",
    label: "LinkedIn",
  },
  {
    icon: <Mail strokeWidth={1.5} size={24} />,
    href: mailtoLink,
    label: "Email",
  },
];

const highlights = [
  {
    title: "Clean code",
    description: "Readable, maintainable solutions",
  },
  {
    title: "Full stack",
    description: "Frontend and backend, connected end to end",
  },
  {
    title: "Always learning",
    description: "Adapted to a new stack (Python, FastAPI) to lead IMeet",
  },
];

export const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-accent font-medium tracking-wide">Hi! I'm Carlos Marquina</p>
          <h2 className="text-3xl lg:text-5xl text-brand font-extrabold uppercase leading-tight">
            Full-Stack
            <br />
            <span className="text-accent">Web Developer</span>
          </h2>
        </div>

        <p className="text-lg text-text-primary/90 leading-relaxed max-w-xl">
          I work mainly with the{" "}
          <span className="text-accent font-semibold">PERN stack</span>:{" "}
          <span className="text-accent font-semibold">PostgreSQL</span>,{" "}
          <span className="text-accent font-semibold">Express</span>,{" "}
          <span className="text-accent font-semibold">React</span> and{" "}
          <span className="text-accent font-semibold">Node.js</span>.
          I turn ideas into working web applications with clean code.
        </p>
      </section>

      {/* Main actions */}
      <section className="flex flex-wrap gap-4 items-center">
          <DownloadButton
            href="/documents/carlos_marquina_cv_en.pdf"
            download="carlos_marquina_cv.pdf"
            openInNewTab={true}
          >
            Download CV
          </DownloadButton>

        <div className="flex gap-3 items-center">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-brand">
        Being a developer is not about having every answer — it's about knowing how to find them.
      </Blockquote>

      {/* Tech stack */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Code2 className="text-brand" size={24} />
          Tech stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1.5 bg-surface/50 border border-border rounded-md text-sm text-accent font-medium hover:border-accent/50 transition-colors"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Briefcase className="text-brand" size={24} />
          What I offer
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="p-4 bg-surface/50 border border-border-subtle rounded-md hover:border-brand/30 transition-colors"
            >
              <h4 className="text-text-primary font-semibold">{item.title}</h4>
              <p className="text-text-muted text-sm mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">
          Ready to start?
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/projects">
            <ButtonWithIcon icon={<Code2 size={18} />}>
              View projects
            </ButtonWithIcon>
          </Link>
          <Link to="/services">
            <ButtonWithIcon icon={<Briefcase size={18} />}>
              My services
            </ButtonWithIcon>
          </Link>
          <Link to="/contact">
            <ButtonWithIcon icon={<ArrowRight size={18} />}>
              Contact me
            </ButtonWithIcon>
          </Link>
        </div>
      </section>

      {/* Closing */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          I enjoy turning complex problems into simple, working solutions.
          I'm looking for opportunities to apply my technical skills,
          work with experienced teams, and keep growing as a developer.
        </p>
      </section>
    </>
  );
};
