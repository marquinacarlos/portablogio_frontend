import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send, MessageCircle, Github, Linkedin } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
// import { WhatsappIcon } from "../components/WhatsappIcon";
import { contactService, type ContactFormData } from "../services/contactService";

const email = "contact@carlosmarquina.dev";
const subject = "Hello Carlos";
const body = "Hi Carlos,\n\nI'm [YOUR NAME] and I'm reaching out because...";

const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const contactInfo = [
  {
    icon: <Mail className="text-accent" size={20} />,
    label: "Email",
    value: email,
    href: mailtoLink,
  },
  {
    icon: <MapPin className="text-accent" size={20} />,
    label: "Location",
    value: "Barcelona, Spain",
    href: null,
  },
];

const socialLinks = [
  {
    icon: <Github size={24} />,
    label: "GitHub",
    href: "https://github.com/marquinacarlos",
  },
  {
    icon: <Linkedin size={24} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marquinacarlos",
  },
  // {
  //   icon: <WhatsappIcon />,
  //   label: "WhatsApp",
  //   href: "https://wa.me/34663143797",
  // },
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
    "w-full px-4 py-3 bg-surface/50 border border-border rounded-md text-text-primary placeholder:text-text-placeholder focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors";

  return (
    <>
      <Subtitle>Contact</Subtitle>

      {/* Introduction */}
      <section className="space-y-2">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          Do you have a project in mind or a job opportunity?
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          I'd love to hear from you. Fill out the form or contact me directly
          through any of the channels below.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        {/* Form */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <MessageCircle className="text-brand" size={24} />
            Send me a message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-text-primary/80">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-text-primary/80">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm text-text-primary/80">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can I help you?"
                className={inputClasses}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-text-primary/80">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project or proposal..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div className="flex items-center gap-4">
              <ButtonWithIcon
                icon={<Send size={18} />}
                className={isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </ButtonWithIcon>

              {submitStatus === "success" && (
                <p className="text-success text-sm">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-error text-sm">
                  Error sending message. Please try again.
                </p>
              )}
            </div>
          </form>
        </section>

        {/* Contact info */}
        <aside className="space-y-6 lg:w-64">
          {/* Direct info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Contact information
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-wide">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-text-primary hover:text-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-primary">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Follow me
            </h3>
            <div className="flex gap-4">
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
          </div>

          {/* Availability */}
          <div className="p-4 bg-surface/50 border border-border-subtle rounded-md">
            <p className="text-text-primary/80 text-sm">
              <span className="inline-block w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              Available for freelance projects and job opportunities.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};
