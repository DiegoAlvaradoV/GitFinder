import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import DarkMode from '../DarkMode/DarkMode';

const Navbar = () => {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const content = <>

    <div className='z-50 lg:hidden block absolute top-16 w-full left-0 rigth-0 bg-zinc-950 transition'>

      <ul className='text-center text-xl p-20'>

        <Link to='/'>

          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-900 hover:rounded font-bold'>Home</li>

        </Link>

        <a href='https://linkedin.com/in/diego-andres-alvarado-valle' target='_blank'>

          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-900 hover:rounded font-bold'>LindekIn</li>

        </a>

        <a href='https://github.com/DiegoAlvaradoV' target='_blank'>

          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-900 hover:rounded font-bold'>Github</li>

        </a>

        <a href='https://diegoalvaradov.github.io/Portfolio/' target='_blank'>

          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-900 hover:rounded font-bold'>Website</li>

        </a>

        <a href='/cv/DiegoAlvaradoCV.pdf' download>

          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-900 hover:rounded font-bold'>CV</li>

        </a>

        <div className='flex justify-center items-center'>

          <DarkMode />

        </div>

      </ul>

    </div>

  </>
    
    
  return (
    <>

    <nav className='bg-zinc-950'>

      <div className='h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1'>
        
        <div className='flex items-center flex-1'>

            <Link to='/'>

              <span className='text-3xl font-bold cursor-pointer hover:text-emerald-700'>GitFinder</span>

            </Link>
          

        </div>

        <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden md:hidden'>

          <div className='flex-10'>

            <ul className='flex gap-8 mr-16 text-[18px]'>

              <Link to='/'>

                <li className='hover:text-emerald-700 transition hover:border-fuchsia-600 cursor-pointer font-bold'>Home</li>

              </Link>

              <a href='https://linkedin.com/in/diego-andres-alvarado-valle' target='_blank'>

                <li className='hover:text-emerald-700 transition hover:border-fuchsia-600 cursor-pointer font-bold'>LinkedIn</li>
              
              </a>

              <a href='https://github.com/DiegoAlvaradoV' target='_blank'>

                <li className='hover:text-emerald-700 transition hover:border-fuchsia-600 cursor-pointer font-bold'>Github</li>
              
              </a>

              <a href='https://diegoalvaradov.github.io/Portfolio/' target='_blank'>

                <li className='hover:text-emerald-700 transition hover:border-fuchsia-600 cursor-pointer font-bold'>Website</li>

              </a>

              <a href='/cv/DiegoAlvaradoCV.pdf' download>

                <li className='hover:text-emerald-700 transition hover:border-fuchsia-600 cursor-pointer font-bold'>CV</li>

              </a>

              <DarkMode />

            </ul>

          </div>

        </div>

          <div>
            {click && content}
          </div>

          <button className='block lg:hidden transition' onClick={handleClick}>

            {click ? <IoCloseSharp size={25} /> : <HiBars3BottomRight size={25} />}

          </button>

      </div>

    </nav>
     
    </>
  );
}

export default Navbar