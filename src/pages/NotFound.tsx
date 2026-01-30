import { Link } from "react-router";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { ButtonWithIcon } from "../components/ButtonWithIcon";

export const NotFound = () => {
  return (
    <>
      <Subtitle className="text-accent">Error 404</Subtitle>

      {/* Mensaje principal */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-brand" size={48} />
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
            Página no encontrada
          </h3>
        </div>

        <p className="text-lg text-text-primary/90 leading-relaxed max-w-xl">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <p className="text-text-secondary leading-relaxed max-w-xl">
          Puede que el enlace esté roto, la URL sea incorrecta o el contenido
          haya sido eliminado.
        </p>
      </section>

      {/* Sugerencias */}
      <section className="space-y-4">
        <h4 className="text-lg font-semibold text-text-primary">
          ¿Qué puedes hacer?
        </h4>
        <ul className="space-y-2 text-text-primary/80">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Verifica que la URL esté escrita correctamente
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Regresa a la página anterior
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Visita la página de inicio
          </li>
        </ul>
      </section>

      {/* Acciones */}
      <section className="flex flex-wrap gap-3">
        <Link to="/">
          <ButtonWithIcon icon={<Home size={18} />}>
            Ir al inicio
          </ButtonWithIcon>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-text-primary hover:border-accent/50 transition-colors"
        >
          <ArrowLeft size={18} />
          Volver atrás
        </button>
      </section>

      {/* Decorativo */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-muted text-sm">
          Si crees que esto es un error, puedes contactarme para reportarlo.
        </p>
      </section>
    </>
  );
};
