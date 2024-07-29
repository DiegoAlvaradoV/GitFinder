import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { FaSun } from "react-icons/fa6";
import { GiMoon } from "react-icons/gi";

const DarkMode: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = context;

  return (
    <div className='cursor-pointer'>
      {theme === 'light' ? (
        <GiMoon size={25} onClick={toggleTheme} className='hover:text-gray-600' />
      ) : (
        <FaSun size={25} onClick={toggleTheme} className='hover:text-amber-600' />
      )}
    </div>
  );
};

export default DarkMode;
