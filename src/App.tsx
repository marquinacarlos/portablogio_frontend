// import { Routes, Route, Outlet, NavLink } from "react-router"


// const Layout = () => {
//   return (
//     <div className="w-dvw h-dvh p-1 bg-amber-100 grid grid-cols-[max-content_3fr]">
//         <div className="">
//           <nav className="flex flex-col justify-between gap-2">
//             <NavLink to="/" end>
//               Home
//             </NavLink>
//             <NavLink to="/contact" end>
//               Contact me
//             </NavLink>
//             <NavLink to="/blog" end>
//               Blog
//             </NavLink>
//           </nav>
//         </div>
//         <div className="">
//           <Outlet/>
//         </div>
//     </div>
//   );
// }


// export const App = () => {

//   return (
//     <>
//     <Routes>
//       <Route element={<Layout />}>
//         <Route index element={<h1>Home</h1>} />
//         <Route path="contact" element={<h1>Contact</h1>} />
//         <Route path="blog" element={<h1>Blog</h1>} />
//       </Route>
//     </Routes>
//     </>
//   )
// }





import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';


export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}





