import { Check } from 'lucide-react';
import type { Service } from '../types'; // Importamos la interfaz que definimos antes
import { cn } from '../lib/utils';  // Nuestra utilidad para estilos

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  console.log(service.features)
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow p-6 flex flex-col h-full">
      {/* Encabezado */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm mb-4 min-h-[40px]">{service.description}</p>
      
      {/* Precio */}
      <div className="text-3xl font-extrabold text-blue-600 mb-6">
        {service.price}€ <span className="text-sm font-normal text-gray-400">/ proyecto</span>
      </div>

      {/* Lista de Características */}
      <ul className="space-y-3 mb-6 flex-grow">
        {service.features?.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        )) ?? <p>No hay características disponibles</p>}
      </ul>

      {/* Botón de Acción */}
      <button className={cn(
        "w-full py-2 px-4 rounded-lg font-medium transition-colors",
        "bg-gray-900 text-white hover:bg-gray-800"
      )}>
        Contratar
      </button>
    </div>
  );
}	