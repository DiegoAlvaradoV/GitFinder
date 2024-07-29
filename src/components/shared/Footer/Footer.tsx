
const footerYear = new Date().getFullYear();

const Footer = () => {
  return (

    <footer className='bg-zinc-950 h-16 flex justify-center items-center font-black cursor-context-menu'>

      <p className='text-white'>Copyright &copy; {footerYear} All right reserved</p>       

    </footer>
  )
}

export default Footer