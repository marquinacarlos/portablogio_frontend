import { Link } from "react-router";
import { Subtitle } from "../components/Subtitle";
import { FileUser, Github, Linkedin, Quote } from 'lucide-react';
import { WhatsappIcon } from "../components/WhatsappIcon";
import { Blockquote } from "../components/Blockquote";
import { ButtonWithIcon } from "../components/ButtonWithIcon";

export const HomePage = () => {
  return (
    <>
      <Subtitle>Inicio</Subtitle>


      <h3 className="text-3xl text-orange-400 font-extrabold uppercase">
        <span className="">
          Dev web
        </span>
        <br />
        <span>
          full stack
        </span>
      </h3>

      <div className="flex space-x-4 items-center mt-6">
        <ButtonWithIcon icon={<FileUser />}>
          Descargar CV
        </ButtonWithIcon>
        <Link 
          to="#"
          className="text-cyan-400"
          >
            <Github strokeWidth={1} />
        </Link>
        <Link 
          to="#"
          className="text-cyan-400"
          >
          <Linkedin strokeWidth={1} />
        </Link>
        <Link to="#" className="text-cyan-400">
          <WhatsappIcon />
        </Link>
      </div>

      <Blockquote className="mt-6 max-w-md">
        Ser desarrollador no es tener todas las respuestas, sino saber cómo encontrarlas.
      </Blockquote>
      
      {/* <p className="mt-4 max-w-80 text-pretty">
        Transformo ideas en productos digitales funcionales y escalables.
      </p> */}

      <div className="mt-4 w-full max-w-80 flex space-x-1 justify-between">
          <ButtonWithIcon icon={<FileUser />}>
            Proyectos
          </ButtonWithIcon>
          <ButtonWithIcon icon={<FileUser />}>
            Contáctame
          </ButtonWithIcon>
      </div>
    </>
  )
}


//   return (
//     <div className="space-y-20">
      
//       {/* 1. HERO SECTION (Introducción) */}
//       <section className="text-center space-y-6 py-10">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
//           <Code2 size={16} /> Desarrollador Web Junior
//         </div>
//         <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
//           Creo experiencias web <br /> 
//           <span className="text-blue-600">modernas y escalables</span>
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Especializado en el stack PERN. Transformo ideas en código limpio y funcional.
//         </p>
//         <div className="flex justify-center gap-4">
//           <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
//             Ver Proyectos
//           </a>
//           <a href="#contact" className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
//             Contactar
//           </a>
//         </div>
//       </section>

//       {/* 2. SECTION: SERVICIOS (Desde la BD) */}
//       <section>
//         <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mis Servicios</h2>
        
//         {services.length === 0 ? (
//           <p className="text-center text-gray-500">No hay servicios activos por el momento.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map(service => (
//               <ServiceCard key={service.id} service={service} />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* 3. SECTION: PROYECTOS DESTACADOS (Desde la BD) */}
//       <section id="projects">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Proyectos Recientes</h2>
//         <div className="grid gap-6">
//             {projects.map(project => (
//                 <div key={project.id} className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-6">
//                     {/* Aquí iría la imagen si la tuviéramos */}
//                     <div className="flex-1">
//                         <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
//                         <div className="flex gap-2 mb-4">
//                             {project.tech_stack.map(tech => (
//                                 <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded uppercase font-bold tracking-wider">
//                                     {tech}
//                                 </span>
//                             ))}
//                         </div>
//                         <p className="text-gray-600 mb-4">{project.description}</p>
//                         <a href="#" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:underline">
//                             Ver Detalles <ArrowRight size={16} />
//                         </a>
//                     </div>
//                 </div>
//             ))}
//             {projects.length === 0 && <p className="text-center text-gray-500">Pronto subiré mis proyectos.</p>}
//         </div>
//       </section>

//     </div>
//   );
// }