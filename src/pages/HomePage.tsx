import { Link } from "react-router";
import { FileUser, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { Blockquote } from "../components/Blockquote";
import { ButtonWithIcon } from "../components/ButtonWithIcon";

export const HomePage = () => {
  return (
    <>
      {/* HERO: Título + Propuesta de Valor */}
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-5xl text-orange-400 font-extrabold uppercase leading-tight text-balance">
          Desarrollador
          <br />
          <span className="text-cyan-400">Full Stack</span>
        </h2>
        
        <p className="text-lg text-amber-100/80 max-w-xl">
          Especializado en <span className="text-cyan-400 font-semibold">React</span>, 
          <span className="text-cyan-400 font-semibold"> Node.js</span> y 
          <span className="text-cyan-400 font-semibold"> PostgreSQL</span>. 
          Transformo requisitos en código limpio, escalable y mantenible.
        </p>
      </div>

      {/* ENLACES SOCIALES + CV */}
      <div className="flex flex-wrap gap-4 items-center">
        <a 
          href="/path-to-your-cv.pdf" 
          download="Carlos_Marquina_CV.pdf"
          className="inline-flex"
        >
          <ButtonWithIcon icon={<FileUser />}>
            Descargar CV
          </ButtonWithIcon>
        </a>
        
        <div className="flex gap-3 items-center">
          <a 
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="GitHub"
          >
            <Github strokeWidth={1} size={28} />
          </a>
          <a 
            href="https://linkedin.com/in/tu-perfil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin strokeWidth={1} size={28} />
          </a>
          <a 
            href="mailto:tu@email.com"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            aria-label="Email"
          >
            <Mail strokeWidth={1} size={28} />
          </a>
        </div>
      </div>

      {/* QUOTE */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Ser desarrollador no es tener todas las respuestas, sino saber cómo encontrarlas.
      </Blockquote>

      {/* DESTACADOS TÉCNICOS */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
          <Code2 className="text-orange-400" size={24} />
          Especializado en
        </h3>
        <div className="flex flex-wrap gap-2">
          {['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Git'].map(tech => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-neutral-800/50 border border-neutral-700 rounded-md text-sm text-cyan-400 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTAs PRINCIPALES */}
      <div className="flex flex-wrap gap-3">
        <Link to="/projects">
          <ButtonWithIcon icon={<Code2 />}>
            Ver Proyectos
          </ButtonWithIcon>
        </Link>
        <Link to="/contact">
          <ButtonWithIcon icon={<Mail />}>
            Contáctame
          </ButtonWithIcon>
        </Link>
      </div>

      {/* OPCIONAL: Mini About */}
      <div className="max-w-xl space-y-2 pt-4 border-t border-neutral-700/50">
        <p className="text-amber-100/70 text-sm leading-relaxed">
          Apasionado por resolver problemas complejos con soluciones simples. 
          Busco mi primera oportunidad profesional donde pueda aportar mis habilidades técnicas 
          y seguir creciendo como desarrollador.
        </p>
      </div>
    </>
  );
}