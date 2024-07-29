import { useState, useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import ThemeContext from "../../context/ThemeContext";
import { MdPersonSearch } from "react-icons/md";
import { MdScreenSearchDesktop } from "react-icons/md";
import { Toaster, toast } from 'sonner';

const Home = () => {
  const [typed, setTyped] = useState<Typed | undefined>();
  const [developer, setDeveloper] = useState<string>("");
  const [repository, setRepository] = useState<string>("");
  const [isUserValid, setIsUserValid] = useState<boolean>(false);
  const [isRepositoryValid, setIsRepositoryValid] = useState<boolean>(false);

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleDeveloper = (e) => {
    if (e.target.value.length > 1 && e.target.value.length < 20) {
      setIsUserValid(true);
      setDeveloper(e.target.value);
    } else {
      setIsUserValid(false);
    }
  };

  const handleRepository = (e) => {
    const input = e.target.value.split('/');
    if (input.length === 2 && input[0].length > 1 && input[0].length < 40 && input[1].length > 1 && input[1].length < 20) {
      setIsRepositoryValid(true);
      setRepository(e.target.value);
    } else {
      setIsRepositoryValid(false);
    }
  };

  const handleSearchRepository = () => {
    if (isRepositoryValid) {
      const [username, repo] = repository.split('/');
      navigate(`/repository/${username}/${repo}`);
    } else {
      toast.error('The developer/repository entered must be valid');
    }
  };

  return (
    <>
      <Toaster richColors position="bottom-left" />
      <main className={`h-screen w-full flex justify-center relative ${theme === 'light' ? 'bg-cover' : 'bg-cover'} ${theme === 'light' ? `bg-[url('/img/light.jpg')]` : `bg-[url('/img/dark.jpg')]`}`}>
        <div className="relative w-full h-full">
          <div className="absolute lg:flex-row lg:w-10/12 w-full h-full flex flex-col justify-evenly items-center lg:ml-40 xl:ml-56 2xl:ml-72">
            <div>
              <FaGithub size={350} color={`${theme === 'light' ? 'black' : 'white'}`} />
            </div>
            <div className="lg:flex lg:flex-col lg:w-full">
              <div className={`${theme === 'light' ? 'text-black' : 'text-white'} flex justify-center font-black text-2xl text-center mb-10 lg:m-14 cursor-context-menu`}>
                <p>Power your code<span> </span>
                  <span className="text-emerald-600">
                    <ReactTyped
                      typedRef={setTyped}
                      strings={[
                        "exploring...",
                        "finding...",
                        "collaborating...",
                        "innovating...",
                        "connecting...",
                        "discovering...",
                        "searching...",
                        "optimizing...",
                        "perfecting...",
                        "building...",
                        "creating...",
                        "developing...",
                        "coding...",
                      ]}
                      typeSpeed={120}
                      loop
                    />
                  </span>
                </p>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="flex justify-center items-center mb-4">
                  <input type="text" required minLength={2} maxLength={20} placeholder="Username" onChange={handleDeveloper} className={`border border-emerald-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme === 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'}`} />
                  {isUserValid ?
                    <Link to={`/user/${developer}`} className="bg-emerald-950">
                      <MdPersonSearch color="white" size={35} />
                    </Link>
                    :
                    <div className="bg-emerald-950">
                      <MdPersonSearch color="white" size={35} className="cursor-pointer" onClick={() => { toast.error('The username entered must be valid') }} />
                    </div>
                  }
                </div>
                <div className="flex justify-center items-center">
                  <input type="text" required minLength={2} maxLength={40} placeholder="Username/Repository" onChange={handleRepository} className={`border border-emerald-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme === 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'}`} />
                  <div className="bg-emerald-950">
                    <MdScreenSearchDesktop color="white" size={35} className={`cursor-pointer ${isRepositoryValid ? '' : 'opacity-50 cursor-not-allowed'}`} onClick={handleSearchRepository} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
