import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { FaSun } from "react-icons/fa6";
import { GiMoon } from "react-icons/gi";

const DarkMode = () => {

    const { theme,toggleTheme } = useContext(ThemeContext)

  return (
    <div className='cursor-pointer'>

        {theme === 'light' ? <GiMoon size={25} onClick={toggleTheme} className='hover:text-gray-600'/> : <FaSun size={25} onClick={toggleTheme} className='hover:text-amber-600'/>}

    </div>
  )
}

export default DarkMode