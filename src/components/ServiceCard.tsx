import type { Service } from '../types'; // Importamos la interfaz que definimos antes
import { Link } from 'react-router';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <>
      <li className="min-w-0 w-full flex flex-col border border-orange-500/30 rounded-sm p-1">
        <Link 
          to={{ pathname: '/blog/blog_slug_test'}}
          className="font-extralight text-3xl text-end uppercase text-orange-400 md:text-5xl lg:text-7xl text-balance"
        >
          {service.title}
        </Link>
        <p className="text-xs font-bold text-end text-amber-100/70">
          {service.description}
        </p>
        <p>
          {service.price}€
        </p>
      </li>
    </>
  );
}