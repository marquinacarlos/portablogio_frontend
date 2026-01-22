import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { BackgroundAnimated } from './BackgroundAnimated';

export const Layout = () => {
  return (
    <>
      <BackgroundAnimated />
      <div className="h-dvh text-amber-50 grid grid-rows-[1fr] relative overflow-hidden">
        <div className='grid grid-rows-[auto_1fr] border border-neutral-600 rounded-sm m-4 p-1 overflow-hidden'>
          <Navbar />
          <h1 className='sr-only'>Carlos Marquina</h1>

          <main 
            className="py-6 grid grid-rows-[1fr] overflow-y-auto scrollbar-custom relative max-w-7xl lg:mx-auto lg:w-full"
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 18px, black calc(100% - 18px), transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18px, black calc(100% - 18px), transparent)'
            }}
          >
            <div className='min-w-0 w-full flex flex-col space-y-8 md:ml-auto md:max-w-[calc(100%-200px)] lg:max-w-[calc(100%-400px)]'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}