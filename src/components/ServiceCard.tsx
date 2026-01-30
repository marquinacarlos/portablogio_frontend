import type { Service } from "../types";
import { Check } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <li className="min-w-0 w-full flex flex-col border border-brand/30 rounded-md p-4 bg-surface/30 hover:bg-surface/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl text-brand md:text-2xl">
            {service.title}
          </h3>
          {service.description && (
            <p className="text-sm text-text-secondary max-w-md">
              {service.description}
            </p>
          )}
        </div>
        <div className="flex items-baseline gap-1 shrink-0">
          <span className="text-2xl font-bold text-accent">
            {service.price}€
          </span>
          <span className="text-text-muted text-sm">desde</span>
        </div>
      </div>

      {service.features && service.features.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-text-primary/80"
            >
              <Check className="text-accent shrink-0" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
