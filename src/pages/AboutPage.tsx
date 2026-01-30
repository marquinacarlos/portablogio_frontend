import { Code2, GraduationCap, Heart, Target, Rocket, Coffee } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";

const skills = {
  frontend: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  tools: ["Git", "GitHub", "VS Code", "Vite", "Docker"],
};

const values = [
  {
    icon: <Target className="text-brand" size={24} />,
    title: "Código limpio",
    description: "Escribo código legible, mantenible y bien documentado.",
  },
  {
    icon: <Rocket className="text-brand" size={24} />,
    title: "Aprendizaje continuo",
    description: "Siempre estoy explorando nuevas tecnologías y mejores prácticas.",
  },
  {
    icon: <Heart className="text-brand" size={24} />,
    title: "Pasión por resolver problemas",
    description: "Disfruto transformar desafíos complejos en soluciones elegantes.",
  },
];

export const AboutPage = () => {
  return (
    <>
      <Subtitle>Sobre mí</Subtitle>

      {/* Introducción */}
      <section className="space-y-4">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          ¡Hola! Soy <span className="text-accent font-semibold">Carlos Marquina</span>,
          desarrollador Full Stack apasionado por crear experiencias web que combinan
          funcionalidad con diseño atractivo.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          Mi viaje en el desarrollo comenzó con la curiosidad de entender cómo funcionan
          las aplicaciones que usamos a diario. Esa curiosidad se transformó en una pasión
          por construir soluciones digitales que realmente impacten.
        </p>
      </section>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        El mejor código es aquel que no necesitas explicar.
      </Blockquote>

      {/* Habilidades técnicas */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Code2 className="text-brand" size={24} />
          Habilidades técnicas
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
              Herramientas
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

      {/* Formación */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <GraduationCap className="text-brand" size={24} />
          Formación
        </h3>
        <div className="space-y-3">
          <div className="border-l-2 border-cyan-400/50 pl-4">
            <p className="text-text-primary font-medium">Desarrollo Web Full Stack</p>
            <p className="text-text-muted text-sm">Formación autodidacta y cursos especializados</p>
          </div>
          <div className="border-l-2 border-cyan-400/50 pl-4">
            <p className="text-text-primary font-medium">Práctica constante</p>
            <p className="text-text-muted text-sm">Proyectos personales y colaborativos</p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Coffee className="text-brand" size={24} />
          Lo que me define
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

      {/* Cierre */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          Actualmente busco mi primera oportunidad profesional donde pueda aportar mis
          habilidades técnicas, aprender de equipos experimentados y seguir creciendo
          como desarrollador. Si tienes un proyecto interesante o una oportunidad,
          ¡me encantaría conocerla!
        </p>
      </section>
    </>
  );
};
