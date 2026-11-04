import { Code2, GraduationCap, Heart, Target, Rocket, Coffee } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";

const skills = {
  frontend: ["React", "JavaScript", "HTML", "CSS", "TailwindCSS", "Vue"],
  backend: ["Node.js", "Express", "PostgreSQL", "Python", "FastAPI", "SQL"],
  tools: ["Git", "GitHub", "GitHub Projects", "Figma", "Docker (basic)"],
};

const values = [
  {
    icon: <Target className="text-brand" size={24} />,
    title: "Clean code",
    description: "I write readable, maintainable code.",
  },
  {
    icon: <Rocket className="text-brand" size={24} />,
    title: "Continuous learning",
    description: "I keep exploring new tools and better ways of working, like learning FastAPI for IMeet.",
  },
  {
    icon: <Heart className="text-brand" size={24} />,
    title: "Clear communication",
    description: "In IMeet, talking often with the team helped us avoid delays and solve problems fast.",
  },
];

export const AboutPage = () => {
  return (
    <>
      <Subtitle>About me</Subtitle>

      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          Hi! I'm <span className="text-accent font-semibold">Carlos Marquina</span>,
          a Full Stack Developer with a practical approach. My priority is to build
          and deliver solutions, with real commitment in every project.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          I'm a MigraCode Barcelona graduate (July 2026), where I was Tech Lead on
          IMeet, the bootcamp's final project. Before that, I built Minitweet on my
          own during a Vue course at Escuela Da Vinci.
        </p>
      </section>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        The best code is the one you don't need to explain.
      </Blockquote>

      {/* Technical skills */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Code2 className="text-brand" size={24} />
          Technical skills
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <h4 className="text-accent font-semibold text-sm uppercase tracking-wide">
              Frontend
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-hover/50 border border-border rounded-md text-sm text-text-primary/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-accent font-semibold text-sm uppercase tracking-wide">
              Backend
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-hover/50 border border-border rounded-md text-sm text-text-primary/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-accent font-semibold text-sm uppercase tracking-wide">
              Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-hover/50 border border-border rounded-md text-sm text-text-primary/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <GraduationCap className="text-brand" size={24} />
          Education
        </h3>
        <div className="space-y-3">
          <div className="border-l-2 border-cyan-400/50 pl-4">
            <p className="text-text-primary font-medium">Full-stack Web Developer (certified), MigraCode Barcelona</p>
            <p className="text-text-muted text-sm">October 2025 - July 2026</p>
          </div>
          <div className="border-l-2 border-cyan-400/50 pl-4">
            <p className="text-text-primary font-medium">Higher Technical Degree in Web Development and Design, Escuela Da Vinci (Argentina)</p>
            <p className="text-text-muted text-sm">August 2022 - present</p>
          </div>
          <div className="border-l-2 border-cyan-400/50 pl-4">
            <p className="text-text-primary font-medium">Platzi, online training in technology and programming</p>
            <p className="text-text-muted text-sm">2023 - present</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Coffee className="text-brand" size={24} />
          What defines me
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-4 bg-surface/50 border border-border-subtle rounded-md space-y-2"
            >
              <div className="flex items-center gap-2">
                {value.icon}
                <h4 className="text-text-primary font-semibold">{value.title}</h4>
              </div>
              <p className="text-text-muted text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          I'm currently looking for my first professional opportunity, where I can
          apply my technical skills, learn from experienced teams, and keep growing
          as a developer. If you have an interesting project or opportunity,
          I'd love to hear about it!
        </p>
      </section>
    </>
  );
};
