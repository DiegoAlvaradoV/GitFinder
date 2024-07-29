import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdScreenSearchDesktop } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Spinner from '../../statics/Spinner/Spinner';
import { getRepoData } from '../../services/githubApi';
import { Toaster, toast } from 'sonner';

const RepositorySearch = () => {
  const { username, repository } = useParams<{ username: string; repository: string }>();
  const [repoData, setRepoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isInputValid, setIsInputValid] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const input = e.target.value.split('/');
    if (input.length === 2 && input[0].length > 1 && input[0].length < 40 && input[1].length > 1 && input[1].length < 20) {
      setIsInputValid(true);
      setSearchInput(e.target.value);
    } else {
      setIsInputValid(false);
    }
  };

  const handleSearch = () => {
    if (isInputValid) {
      const [username, repo] = searchInput.split('/');
      navigate(`/repository/${username}/${repo}`);
    } else {
      toast.error('The developer/repository entered must be valid');
    }
  };

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        setLoading(true);
        const data = await getRepoData(username, repository);
        if (data) {
          setRepoData(data);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Error fetching repository data');
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [username, repository]);

  if (loading) {
    return (
      <main className={`${theme === 'light' ? '' : 'bg-gray-900 text-white'} h-screen w-full flex items-center justify-center`}>
        <Spinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className={`${theme === 'light' ? '' : 'bg-gray-900 text-white'} h-screen w-full flex items-center justify-center`}>
        <div>
          {error}. Try Again.
          <div className="mt-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Username/Repository"
              onChange={handleInputChange}
              className={`border border-emerald-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme === 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'}`}
            />
            
            <MdScreenSearchDesktop
              color="white"
              size={40}
              className={`cursor-pointer ${isInputValid ? '' : 'opacity-50 cursor-not-allowed'} bg-emerald-700`}
              onClick={handleSearch}
            />
            
          </div>
        </div>
      </main>
    );
  }

  if (!repoData) {
    return (
      <main className="h-screen w-full flex flex-col items-center justify-center">
        <div>User not found</div>
        <div className="mt-4 flex flex-col items-center">
     
          <input
            type="text"
            placeholder="Username/Repository"
            onChange={handleInputChange}
            className={`border border-emerald-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme === 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'}`}
          />
          
            <MdScreenSearchDesktop
              color="white"
              size={35}
              className={`cursor-pointer ${isInputValid ? '' : 'opacity-50 cursor-not-allowed'}`}
              onClick={handleSearch}
            />
          
        </div>
      </main>
    );
  }

  return (
    <>
      <Toaster richColors position="bottom-left" />
      <main className={`${theme === 'light' ? '' : 'bg-gray-900 text-white'} h-screen w-full flex flex-col lg:flex-row`}>
        <div className={`${theme == 'light' ? '' : 'bg-gray-900 text-white'} lg:w-1/3 w-full shadow-md p-6 flex flex-col items-center`}>
          <div className="mb-4 w-auto flex">
          <input
              type="text"
              placeholder="Username/Repository"
              onChange={handleInputChange}
              className={`border border-emerald-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-auto ${theme === 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'}`}
            />
            
            <MdScreenSearchDesktop
              color="white"
              size={40}
              className={`cursor-pointer ${isInputValid ? '' : 'opacity-50 cursor-not-allowed'} bg-emerald-700`}
              onClick={handleSearch}
            />
          </div> 
          {repoData.user && (
            <div className='flex flex-col justify-center items-center text-center mt-40'>
              <img src={repoData.user.avatar_url} alt="User Avatar" className="rounded-full w-24 h-24 mb-4" />
              <h2 className="text-xl font-bold">{repoData.user.login}</h2>
              <p className="text-gray-600 text-semibold">{repoData.user.bio}</p>
              <p className="mt-4">Followers: {repoData.user.followers}</p>
              <p>Following: {repoData.user.following}</p>
              <p>Public Repos: {repoData.user.public_repos}</p>
              <Link to={`/user/${repoData.user.login}`} className='inline-block bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-center my-1'>View user details</Link>
              <a href={repoData.user.html_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-center my-1">
                View User on GitHub
              </a>
            </div>
          )}
        </div>
        <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-950'} lg:w-3/4 w-full p-6 overflow-auto h-full flex justify-center items-center flex-col`}>
          {repoData.repo ? (
            <>
              <h1 className="text-2xl font-bold">{repoData.repo.full_name}</h1>
              <p className="text-gray-600">{repoData.repo.description}</p>
              <p className="mt-4">Stars: {repoData.repo.stargazers_count}</p>
              <p>Forks: {repoData.repo.forks_count}</p>
              <p>Open Issues: {repoData.repo.open_issues_count}</p>
              <p>Language: {repoData.repo.language}</p>
              <a href={repoData.repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-center my-1">
                View Repository on GitHub
              </a>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold">{repoData.user.login}</h1>
              <p className="text-gray-600">The repository "{repository}" does not exist for this user.</p>
              <p className="mt-4">Followers: {repoData.user.followers}</p>
              <p>Following: {repoData.user.following}</p>
              <p>Public Repos: {repoData.user.public_repos}</p>
              <a href={repoData.user.html_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-center my-1">
                View User on GitHub
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default RepositorySearch;
