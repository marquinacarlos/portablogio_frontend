import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send, MessageCircle, Github, Linkedin } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { WhatsappIcon } from "../components/WhatsappIcon";
import { contactService, type ContactFormData } from "../services/contactService";

const contactInfo = [
  {
    icon: <Mail className="text-cyan-400" size={20} />,
    label: "Email",
    value: "carlosscripto@gmail.com",
    href: "mailto:carlosscripto@gmail.com",
  },
  {
    icon: <MapPin className="text-cyan-400" size={20} />,
    label: "Ubicación",
    value: "España",
    href: null,
  },
];

const socialLinks = [
  {
    icon: <Github size={24} />,
    label: "GitHub",
    href: "https://github.com/tu-usuario",
  },
  {
    icon: <Linkedin size={24} />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/tu-perfil",
  },
  {
    icon: <WhatsappIcon />,
    label: "WhatsApp",
    href: "https://wa.me/34663143797",
  },
];

export const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await contactService.send(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors";

  return (
    <>
      <Subtitle>Contacto</Subtitle>

      {/* Introducción */}
      <section className="space-y-2">
        <p className="text-lg text-amber-100/90 leading-relaxed max-w-2xl">
          ¿Tienes un proyecto en mente o una oportunidad laboral?
        </p>
        <p className="text-amber-100/70 leading-relaxed max-w-2xl">
          Me encantaría escucharte. Completa el formulario o contáctame directamente
          a través de cualquiera de los canales disponibles.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        {/* Formulario */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
            <MessageCircle className="text-orange-400" size={24} />
            Envíame un mensaje
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-amber-100/80">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-amber-100/80">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm text-amber-100/80">
                Asunto *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="¿En qué puedo ayudarte?"
                className={inputClasses}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-amber-100/80">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Cuéntame sobre tu proyecto o propuesta..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div className="flex items-center gap-4">
              <ButtonWithIcon
                icon={<Send size={18} />}
                className={isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </ButtonWithIcon>

              {submitStatus === "success" && (
                <p className="text-green-400 text-sm">
                  ¡Mensaje enviado correctamente!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm">
                  Error al enviar. Intenta de nuevo.
                </p>
              )}
            </div>
          </form>
        </section>

        {/* Info de contacto */}
        <aside className="space-y-6 lg:w-64">
          {/* Información directa */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-50">
              Información de contacto
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-amber-100/60 text-xs uppercase tracking-wide">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-amber-100 hover:text-cyan-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-amber-100">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-50">
              Sígueme en redes
            </h3>
            <div className="flex gap-4">
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
          </div>

          {/* Disponibilidad */}
          <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-md">
            <p className="text-amber-100/80 text-sm">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Disponible para proyectos freelance y oportunidades laborales.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};
