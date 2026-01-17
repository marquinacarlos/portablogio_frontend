import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { BackgroundAnimated } from './BackgroundAnimated';

export const Layout = () => {
  return (
    <>
      <BackgroundAnimated />
      <div className="h-dvh text-amber-50 flex relative overflow-hidden">
        <div className='flex-1 grid grid-rows-[auto_1fr] border border-neutral-600 rounded-sm m-4 p-1 overflow-hidden'>
          <Navbar />
          <h1 className='sr-only'>Carlos Marquina</h1>

          <main className="flex flex-col overflow-hidden relative max-w-7xl lg:mx-auto lg:w-full">
            <div 
              className="w-full h-full overflow-y-auto scrollbar-custom px-1 py-10 flex justify-end max-w-7xl lg:mx-auto lg:w-full"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 18px, black calc(100% - 16px), transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 18px), transparent)'
              }}
            >
              <div className='w-full h-full md:max-w-[calc(100%-300px)] flex flex-col'>
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}