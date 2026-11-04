import { NavLink } from 'react-router';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Logo } from './Logo';
import { ThemeSelector } from './ThemeSelector';

// Styles for nav links with active state
const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'transition-colors',
    isActive
      ? 'text-brand font-semibold'
      : 'text-text-primary hover:text-brand'
  );

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
        'w-full h-1 bg-brand transition-all duration-300 origin-left',
        isOpen && 'rotate-45 translate-x-1.5 -translate-y-1'
      )}></span>

      <span className={clsx(
        'w-full h-1 bg-brand transition-all duration-300',
        isOpen && 'opacity-0'
      )}></span>

      <span className={clsx(
        'w-full h-1 bg-brand transition-all duration-300 origin-left',
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
      'flex flex-col items-center justify-center space-y-8 text-2xl',
      'overflow-y-auto py-20',
      'transition-transform duration-500 ease-in-out',
      isOpen ? 'translate-x-0' : 'translate-x-full',

      'lg:static lg:z-auto lg:w-auto lg:h-auto lg:backdrop-blur-none',
      'lg:flex-row lg:space-y-0 lg:space-x-6 lg:text-xl',
      'lg:translate-x-0 lg:transition-none lg:overflow-visible lg:py-0'
    )}>
      <li>
        <NavLink
          to={{ pathname: '/'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{ pathname: '/projects'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          Projects
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{ pathname: '/services'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          Services
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to={{ pathname: '/blog'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          Blog
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to={{ pathname: '/about'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{ pathname: '/contact'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          Contact
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          to={{ pathname: '/login'}}
          onClick={onClose}
          className={navLinkClasses}
        >
          Admin
        </NavLink>
      </li> */}
      {/* ThemeSelector only visible in mobile menu (not tablet or desktop) */}
      <li className="sm:hidden pt-4 border-t border-border/30">
        <ThemeSelector />
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
        <div className="flex items-center gap-2">
          <Logo />
          {/* ThemeSelector visible on tablet and desktop (outside the menu) */}
          <div className="hidden sm:block">
            <ThemeSelector />
          </div>
        </div>
        <Menu isOpen={isOpen} onClose={() => setIsOpen(() => false)} />
      </nav>
    </>
  );
}