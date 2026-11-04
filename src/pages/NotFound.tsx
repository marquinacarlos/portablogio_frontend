import { Link } from "react-router";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { ButtonWithIcon } from "../components/ButtonWithIcon";

export const NotFound = () => {
  return (
    <>
      <Subtitle className="text-accent">Error 404</Subtitle>

      {/* Main message */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-brand" size={48} />
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
            Page not found
          </h3>
        </div>

        <p className="text-lg text-text-primary/90 leading-relaxed max-w-xl">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <p className="text-text-secondary leading-relaxed max-w-xl">
          The link may be broken, the URL may be incorrect, or the content
          may have been removed.
        </p>
      </section>

      {/* Suggestions */}
      <section className="space-y-4">
        <h4 className="text-lg font-semibold text-text-primary">
          What can you do?
        </h4>
        <ul className="space-y-2 text-text-primary/80">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Check that the URL is written correctly
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Go back to the previous page
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Visit the home page
          </li>
        </ul>
      </section>

      {/* Actions */}
      <section className="flex flex-wrap gap-3">
        <Link to="/">
          <ButtonWithIcon icon={<Home size={18} />}>
            Go home
          </ButtonWithIcon>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-text-primary hover:border-accent/50 transition-colors"
        >
          <ArrowLeft size={18} />
          Go back
        </button>
      </section>

      {/* Decorative */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-muted text-sm">
          If you think this is a mistake, feel free to contact me and report it.
        </p>
      </section>
    </>
  );
};
