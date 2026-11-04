import { Briefcase, Clock, MessageSquare } from "lucide-react";
import { List } from "../components/List";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";
import type { Service } from "../types";

const services: Service[] = [
  {
    id: 1,
    title: "Personalized tutoring",
    description:
      "One-on-one sessions to answer questions, review code or learn new technologies.",
    price: 15,
    features: [
      "1-hour video call session",
      "Live code review",
      "Technical Q&A",
      "Personalized support material",
    ],
  },
  {
    id: 2,
    title: "Landing Page / One Page",
    description:
      "A single-page website, perfect to present your brand, product or service.",
    price: 150,
    features: [
      "Responsive design",
      "Basic SEO optimization",
      "Contact form",
      "Social media integration",
      "Hosting included for the first year",
      "30 days of technical support",
    ],
  },
  {
    id: 3,
    title: "Corporate website",
    description:
      "A complete multi-page website for your company with every essential section.",
    price: 400,
    features: [
      "Up to 5 custom pages",
      "Basic admin panel",
      "Built-in blog",
      "Advanced SEO optimization",
      "Custom forms",
      "Google Analytics integration",
    ],
  },
  {
    id: 4,
    title: "Personal blog",
    description:
      "A complete blog platform with a content management system and custom design.",
    price: 300,
    features: [
      "Post management system",
      "Categories and tags",
      "Comment system",
      "Custom design",
      "Admin panel",
      "Optimized for readers",
    ],
  },
  {
    id: 5,
    title: "E-commerce",
    description:
      "A full online store with product management, shopping cart and payment gateway.",
    price: 800,
    features: [
      "Unlimited product catalog",
      "Shopping cart",
      "Integrated payment gateway",
      "Inventory management",
      "Full admin panel",
      "Configurable shipping",
      "Email notifications",
      "60 days of technical support",
    ],
  },
  {
    id: 6,
    title: "Custom web application",
    description:
      "Tailor-made development for your specific needs. Ideal for unique projects.",
    price: 1500,
    features: [
      "Requirements analysis",
      "Custom architecture",
      "Optimized database",
      "Full REST API",
      "Admin panel",
      "Technical documentation",
      "Server deployment",
      "90 days of technical support",
    ],
  },
];

const processSteps = [
  {
    icon: <MessageSquare className="text-brand" size={20} />,
    title: "Initial consultation",
    description: "We talk about your project, goals and needs.",
  },
  {
    icon: <Briefcase className="text-brand" size={20} />,
    title: "Proposal",
    description: "I take your feedback and present a detailed proposal.",
  },
  {
    icon: <Clock className="text-brand" size={20} />,
    title: "Development",
    description: "I work on your project with regular updates.",
  },
];

export const ServicesPage = () => {
  return (
    <>
      <Subtitle>Services</Subtitle>

      {/* Introduction */}
      <section className="space-y-2">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          I offer web solutions tailored to each need and budget.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          From a simple landing page to complex web applications,
          every project gets the same dedication and professionalism.
        </p>
      </section>

      {/* Service list */}
      <List>
        {services.map((item) => (
          <List.ServiceCard key={item.id} service={item} />
        ))}
      </List>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Every project is unique. Prices are a starting point and adjust
        to the real complexity of the work.
      </Blockquote>

      {/* Work process */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-text-primary">
          How do we work together?
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="p-4 bg-surface/50 border border-border-subtle rounded-md space-y-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-accent/20 rounded-full text-accent font-bold text-sm">
                  {index + 1}
                </span>
                {step.icon}
              </div>
              <h4 className="text-text-primary font-semibold">{step.title}</h4>
              <p className="text-text-muted text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final note */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          Can't find what you're looking for? Contact me and let's talk about your project.
          I also offer monthly maintenance plans for existing sites.
        </p>
      </section>
    </>
  );
};
