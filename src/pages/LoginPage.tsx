import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { LogIn, Mail, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { useAuthStore, decodeToken } from "../store/authStore";
import { authService } from "../services/authService";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, login, logout } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener la ruta de origen (si venía de una ruta protegida)
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Pequeño delay para mostrar el estado de sesión activa
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });

      // Decodificar el token para obtener info del usuario
      const userData = decodeToken(response.token);

      if (!userData) {
        throw new Error("Token inválido recibido del servidor");
      }

      // Guardar en el store
      login(response.token, userData);

      // La redirección se maneja en useEffect
    } catch (err) {
      if (err instanceof Error) {
        // Errores de axios tienen response.data.error
        const axiosError = err as { response?: { data?: { error?: string } } };
        setError(
          axiosError.response?.data?.error ||
            err.message ||
            "Error al iniciar sesión"
        );
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    setEmail("");
    setPassword("");
  };

  const inputClasses =
    "w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors";

  // Si está autenticado, mostrar estado de sesión activa
  if (isAuthenticated && user) {
    return (
      <>
        <Subtitle>Sesión activa</Subtitle>

        <section className="space-y-4">
          <div className="p-6 bg-surface/50 border border-success/30 rounded-md space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-success" size={32} />
              <div>
                <p className="text-lg font-semibold text-text-primary">
                  ¡Bienvenido, {user.username}!
                </p>
                <p className="text-text-muted text-sm">
                  Has iniciado sesión correctamente
                </p>
              </div>
            </div>

            <p className="text-text-secondary text-sm">
              Serás redirigido al panel de administración en unos segundos...
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/admin">
                <ButtonWithIcon icon={<ArrowLeft size={18} />}>
                  Ir al panel
                </ButtonWithIcon>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-border rounded-md text-text-primary hover:border-error/50 hover:text-error transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Subtitle>Iniciar sesión</Subtitle>

      {/* Introducción */}
      <section className="space-y-2">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-xl">
          Accede a tu cuenta para gestionar el contenido.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-xl">
          Esta sección está reservada para administradores.
        </p>
      </section>

      {/* Formulario */}
      <section className="w-full max-w-md">
        <div className="p-6 bg-surface/50 border border-border-subtle rounded-md space-y-6">
          <div className="flex items-center gap-2">
            <LogIn className="text-brand" size={24} />
            <h3 className="text-lg font-semibold text-text-primary">
              Credenciales
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm text-text-primary/80"
              >
                <Mail size={16} className="text-accent" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                required
                autoFocus
                autoComplete="email"
                placeholder="tu@email.com"
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm text-text-primary/80"
              >
                <Lock size={16} className="text-accent" />
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-error/10 border border-error/30 rounded-md">
                <p className="text-error text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <ButtonWithIcon
              icon={
                isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn size={18} />
                )
              }
              className={`w-full justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </ButtonWithIcon>
          </form>
        </div>
      </section>

      {/* Volver */}
      <section className="pt-4 border-t border-border/50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </section>
    </>
  );
};
