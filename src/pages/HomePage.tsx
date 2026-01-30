import { Link } from "react-router";
import { Github, Linkedin, Mail, Code2, Briefcase, ArrowRight } from "lucide-react";
import { Blockquote } from "../components/Blockquote";
import { ButtonWithIcon, DownloadButton } from "../components/ButtonWithIcon";

const technologies = [
  { name: "TypeScript", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "REST APIs", category: "backend" },
  { name: "Git", category: "tools" },
];

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
    href: "mailto:carlosscripto@gmail.com",
    label: "Email",
  },
];

const highlights = [
  {
    title: "Código limpio",
    description: "Soluciones legibles y mantenibles",
  },
  {
    title: "Full Stack",
    description: "Frontend y backend integrados",
  },
  {
    title: "En constante aprendizaje",
    description: "Siempre explorando nuevas tecnologías",
  },
];

export const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-cyan-400 font-medium tracking-wide">¡Hola! Soy Carlos Marquina</p>
          <h2 className="text-3xl lg:text-5xl text-orange-400 font-extrabold uppercase leading-tight">
            Desarrollador
            <br />
            <span className="text-cyan-400">Full Stack</span>
          </h2>
        </div>

        <p className="text-lg text-amber-100/90 leading-relaxed max-w-xl">
          Especializado en{" "}
          <span className="text-cyan-400 font-semibold">React</span>,{" "}
          <span className="text-cyan-400 font-semibold">Node.js</span> y{" "}
          <span className="text-cyan-400 font-semibold">PostgreSQL</span>.
          Transformo ideas en aplicaciones web funcionales, escalables y con código limpio.
        </p>
      </section>

      {/* Acciones principales */}
      <section className="flex flex-wrap gap-4 items-center">
          <DownloadButton href="/documents/carlos_marquina_dev_cv.pdf" download="marquina-carlos.pdf" openInNewTab={true}>
            Descargar y Ver
          </DownloadButton>

        <div className="flex gap-3 items-center">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Ser desarrollador no es tener todas las respuestas, sino saber cómo encontrarlas.
      </Blockquote>

      {/* Stack técnico */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
          <Code2 className="text-orange-400" size={24} />
          Stack tecnológico
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1.5 bg-neutral-900/50 border border-neutral-700 rounded-md text-sm text-cyan-400 font-medium hover:border-cyan-400/50 transition-colors"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
          <Briefcase className="text-orange-400" size={24} />
          Lo que ofrezco
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-md hover:border-orange-400/30 transition-colors"
            >
              <h4 className="text-amber-100 font-semibold">{item.title}</h4>
              <p className="text-amber-100/60 text-sm mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50">
          ¿Listo para comenzar?
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/projects">
            <ButtonWithIcon icon={<Code2 size={18} />}>
              Ver proyectos
            </ButtonWithIcon>
          </Link>
          <Link to="/services">
            <ButtonWithIcon icon={<Briefcase size={18} />}>
              Mis servicios
            </ButtonWithIcon>
          </Link>
          <Link to="/contact">
            <ButtonWithIcon icon={<ArrowRight size={18} />}>
              Contáctame
            </ButtonWithIcon>
          </Link>
        </div>
      </section>

      {/* Cierre */}
      <section className="pt-4 border-t border-neutral-700/50">
        <p className="text-amber-100/70 text-sm leading-relaxed max-w-2xl">
          Apasionado por resolver problemas complejos con soluciones simples.
          Busco oportunidades donde pueda aportar mis habilidades técnicas,
          colaborar con equipos talentosos y seguir creciendo como desarrollador.
        </p>
      </section>
    </>
  );
};
