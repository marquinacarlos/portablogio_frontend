import { Briefcase, Clock, MessageSquare } from "lucide-react";
import { List } from "../components/List";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";
import type { Service } from "../types";

const services: Service[] = [
  {
    id: 1,
    title: "Tutoría personalizada",
    description:
      "Sesiones individuales para resolver dudas, revisar código o aprender nuevas tecnologías.",
    price: 15,
    features: [
      "Sesión de 1 hora por videollamada",
      "Revisión de código en tiempo real",
      "Resolución de dudas técnicas",
      "Material de apoyo personalizado",
    ],
  },
  {
    id: 2,
    title: "Landing Page / One Page",
    description:
      "Página web de una sola página, perfecta para presentar tu marca, producto o servicio.",
    price: 150,
    features: [
      "Diseño responsive adaptable",
      "Optimización SEO básica",
      "Formulario de contacto",
      "Integración con redes sociales",
      "Hosting incluido primer año",
      "Soporte técnico 30 días",
    ],
  },
  {
    id: 3,
    title: "Sitio web corporativo",
    description:
      "Página web multipágina completa para tu empresa con todas las secciones esenciales.",
    price: 400,
    features: [
      "Hasta 5 páginas personalizadas",
      "Panel de administración básico",
      "Blog integrado",
      "Optimización SEO avanzada",
      "Formularios personalizados",
      "Integración con Google Analytics",
    ],
  },
  {
    id: 4,
    title: "Blog personal",
    description:
      "Plataforma de blog completa con sistema de gestión de contenido y diseño personalizado.",
    price: 300,
    features: [
      "Sistema de gestión de posts",
      "Categorías y etiquetas",
      "Sistema de comentarios",
      "Diseño personalizado",
      "Panel de administración",
      "Optimización para lectores",
    ],
  },
  {
    id: 5,
    title: "E-commerce",
    description:
      "Tienda online completa con gestión de productos, carrito de compras y pasarela de pago.",
    price: 800,
    features: [
      "Catálogo de productos ilimitado",
      "Carrito de compras",
      "Pasarela de pago integrada",
      "Gestión de inventario",
      "Panel de administración completo",
      "Sistema de envíos configurable",
      "Notificaciones por email",
      "Soporte técnico 60 días",
    ],
  },
  {
    id: 6,
    title: "Aplicación web personalizada",
    description:
      "Desarrollo a medida según tus necesidades específicas. Ideal para proyectos únicos.",
    price: 1500,
    features: [
      "Análisis de requerimientos",
      "Arquitectura personalizada",
      "Base de datos optimizada",
      "API REST completa",
      "Panel de administración",
      "Documentación técnica",
      "Despliegue en servidor",
      "Soporte técnico 90 días",
    ],
  },
];

const processSteps = [
  {
    icon: <MessageSquare className="text-orange-400" size={20} />,
    title: "Consulta inicial",
    description: "Hablamos sobre tu proyecto, objetivos y necesidades.",
  },
  {
    icon: <Briefcase className="text-orange-400" size={20} />,
    title: "Propuesta",
    description: "Recibo tu feedback y presento una propuesta detallada.",
  },
  {
    icon: <Clock className="text-orange-400" size={20} />,
    title: "Desarrollo",
    description: "Trabajo en tu proyecto con actualizaciones periódicas.",
  },
];

export const ServicesPage = () => {
  return (
    <>
      <Subtitle>Servicios</Subtitle>

      {/* Introducción */}
      <section className="space-y-2">
        <p className="text-lg text-amber-100/90 leading-relaxed max-w-2xl">
          Ofrezco soluciones web adaptadas a cada necesidad y presupuesto.
        </p>
        <p className="text-amber-100/70 leading-relaxed max-w-2xl">
          Desde una simple landing page hasta aplicaciones web complejas,
          cada proyecto recibe la misma dedicación y profesionalismo.
        </p>
      </section>

      {/* Lista de servicios */}
      <List>
        {services.map((item) => (
          <List.ServiceCard key={item.id} service={item} />
        ))}
      </List>

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Cada proyecto es único. Los precios son orientativos y se ajustan
        según la complejidad real del trabajo.
      </Blockquote>

      {/* Proceso de trabajo */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50">
          ¿Cómo trabajamos juntos?
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-md space-y-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-cyan-400/20 rounded-full text-cyan-400 font-bold text-sm">
                  {index + 1}
                </span>
                {step.icon}
              </div>
              <h4 className="text-amber-100 font-semibold">{step.title}</h4>
              <p className="text-amber-100/60 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nota final */}
      <section className="pt-4 border-t border-neutral-700/50">
        <p className="text-amber-100/70 text-sm leading-relaxed max-w-2xl">
          ¿No encuentras lo que buscas? Contáctame y hablamos sobre tu proyecto.
          También ofrezco planes de mantenimiento mensual para sitios existentes.
        </p>
      </section>
    </>
  );
};
