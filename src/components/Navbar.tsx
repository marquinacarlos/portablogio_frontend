import { NavLink } from 'react-router';
// import { Logo } from './Logo';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Logo } from './Logo';
// import { Terminal, BookOpen, User } from 'lucide-react'; // Iconos

interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToggleButton = ({ isOpen, onToggle }: ToggleButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={clsx(
        'fixed top-9 right-8 z-50 flex flex-col gap-1.5 w-8',
        'lg:hidden'
      )}
    >
      <span className={clsx(
        'w-full h-1 bg-cyan-400 transition-all duration-300 origin-left',
        isOpen && 'rotate-45 translate-x-1.5 -translate-y-1'
      )}></span>

      <span className={clsx(
        'w-full h-1 bg-cyan-400 transition-all duration-300',
        isOpen && 'opacity-0'
      )}></span>

      <span className={clsx(
        'w-full h-1 bg-cyan-400 transition-all duration-300 origin-left',
        isOpen && '-rotate-45 translate-x-1.5 -translate-y-0.5'
      )}></span>
    </button>
  );
}



interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {

  return (
      <ul className={clsx(
        'fixed top-0 left-0 z-40 w-dvw h-dvh backdrop-blur-sm',
        'flex flex-col items-center justify-center space-y-10 text-white text-2xl',
        'transition-transform duration-500 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full',

        'lg:static lg:z-auto lg:w-auto lg:h-auto lg:backdrop-blur-none',
        'lg:flex-row lg:space-y-0 lg:space-x-6 lg:text-xl',
        'lg:translate-x-0 lg:transition-none'
      )}>
        <li>
          <NavLink 
            to={{ pathname: '/'}} 
            onClick={onClose}
          >
              Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{ pathname: '/projects'}} 
            onClick={onClose}
          >
              Proyectos
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{ pathname: '/services'}} 
            onClick={onClose}
          >
              Servicios
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{ pathname: '/blog'}} 
            onClick={onClose}
          >
              Blog
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{ pathname: '/about'}} 
            onClick={onClose}
          >
            Sobre mí
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{ pathname: '/contact'}} 
            onClick={onClose}
          >
              Contacto
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={{ pathname: '/login'}} 
            onClick={onClose}
          >
            Iniciar sesión
          </NavLink>
        </li>
      </ul>
  )
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((value) => !value);
  }

  return (
    <>
      <ToggleButton isOpen={isOpen} onToggle={handleClick} />
      <nav className='h-auto lg:flex lg:justify-between lg:items-center lg:pr-4 max-w-7xl lg:mx-auto lg:w-full'>
        <Logo />
        <Menu isOpen={isOpen} onClose={() => setIsOpen(() => false)} />
      </nav>
    </>
  );
}