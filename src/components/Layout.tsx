import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* El Navbar siempre visible */}
      <Navbar />
      
      {/* Aquí se renderizará la página que toque (Home, Blog, etc.) */}
      <main className="container mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
}