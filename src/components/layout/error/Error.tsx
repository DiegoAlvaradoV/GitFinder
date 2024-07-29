import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
  const context = useContext(ThemeContext);


  const { theme } = context;

  return (
    <main className={`h-screen w-full flex justify-center relative cursor-context-menu ${theme === 'light' ? 'bg-cover' : 'bg-cover'} ${theme === 'light' ? `bg-[url('/img/light.jpg')]` : `bg-[url('/img/dark.jpg')]`}`}>
      <div className="relative w-full h-full">
        <div className="absolute flex justify-center items-center flex-col w-full h-full text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-emerald-900 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-emerald-700 md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-emerald-600 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
          <Link to="/" className="inline-flex text-white bg-emerald-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
