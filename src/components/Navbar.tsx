import { Link } from 'react-router'
import { Terminal, BookOpen, User } from 'lucide-react'; // Iconos

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Marca */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:text-blue-400 transition">
          <Terminal size={24} />
          <span>DevJunior</span>
        </Link>

        {/* Enlaces de Navegación */}
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-1 hover:text-blue-400 transition">
            <User size={18} /> Proyectos
          </Link>
          <Link to="/blog" className="flex items-center gap-1 hover:text-blue-400 transition">
            <BookOpen size={18} /> Blog
          </Link>
          <Link to="/login" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}