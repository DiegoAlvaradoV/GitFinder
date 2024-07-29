import { useEffect, useState,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../statics/Spinner/Spinner';
import ThemeContext from '../../context/ThemeContext';
import { IoIosNavigate } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { RiGitForkFill } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import { getUserData, getUserRepos, getUserFollowers, getUserFollowing } from '../../services/githubApi';

const UserSearch = () => {
  const { username } = useParams<{ username: string }>();
  const [searchUsername, setSearchUsername] = useState(username);
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'repos' | 'followers' | 'following'>('repos');
  
  const history = useNavigate();

  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await getUserData(username);
        const userRepos = await getUserRepos(username);
        const userFollowers = await getUserFollowers(username);
        const userFollowing = await getUserFollowing(username);
        setUserData(data);
        setRepos(userRepos);
        setFollowers(userFollowers);
        setFollowing(userFollowing);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleSearch = () => {
    history(`/user/${searchUsername}`);
  };

  if (loading) {
    return (
      <main className={`${theme == 'light' ? '' : 'bg-gray-900'} h-screen w-full flex items-center justify-center`}>
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
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className={`${theme == 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'} flex-grow px-4 py-2 border rounded-l-md`}
            placeholder="Search for a user..."
          />
          <button onClick={handleSearch} className="bg-emerald-700 text-white px-2 py-2 rounded-r-md">
            <RiUserSearchFill size={30} className='text-white'/>
          </button>
            
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='h-screen w-full flex flex-col lg:flex-row'>
      <div className={`${theme == 'light' ? '' : 'bg-gray-900 text-white'} lg:w-1/4 w-full shadow-md p-6 flex flex-col items-center`}>
        <div className="mb-4 w-auto flex">
          <input
            type="text"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className={`${theme == 'light' ? 'bg-white placeholder-black text-black' : 'bg-gray-950 placeholder-white text-white'} flex-grow px-4 py-2 border rounded-l-md`}
            placeholder="Search for a user..."
          />
          <button onClick={handleSearch} className="bg-emerald-700 text-white px-2 py-2 rounded-r-md">
            <RiUserSearchFill className='text-white'/>
          </button>
        </div>
        {userData ? (
          <div className='lg:mt-60 flex flex-col justify-center items-center text-center'>
            <img
              src={userData.avatar_url}
              alt={`${userData.login} avatar`}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <p className="text-gray-600 mb-2 font-semibold">@{userData.login}</p>
            <p className="text-gray-800 mb-4 font-semibold">{userData.bio}</p>
            <div className="flex justify-around mb-4 w-full">
              <div className="text-center">
                <p className="font-bold">{userData.public_repos}</p>
                <p className="text-gray-600 font-semibold">Repos</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{userData.followers}</p>
                <p className="text-gray-600 font-semibold">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{userData.following}</p>
                <p className="text-gray-600 font-semibold">Following</p>
              </div>
            </div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold text-center"
            >
              View Profile on GitHub
            </a>
          </div>
        ) : (
          <div className="text-center">User not found</div>
        )}
      </div>
      <div className={`${theme == 'light' ? 'bg-white' : 'bg-gray-950'} lg:w-3/4 w-full p-6 overflow-auto h-full`}>
        <div className="mb-4 flex w-full">
          <button
            onClick={() => setActiveTab('repos')}
            className={`${theme == 'light' && activeTab != "repos" ? 'bg-white text-emerald-700' : ''} ${theme != 'light' && activeTab != "repos" ? 'bg-gray-900 text-white' : ''} ${theme == 'light' && activeTab == 'repos' ? 'bg-emerald-700 text-white' : ''} ${theme != 'light' && activeTab == 'repos' ? 'bg-emerald-700 text-white' : ''} font-semibold w-1/3 px-4 py-2  rounded-t-lg`}
          >
            Repositories
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`${theme == 'light' && activeTab != "followers" ? 'bg-white text-emerald-700' : ''} ${theme != 'light' && activeTab != "followers" ? 'bg-gray-900 text-white' : ''} ${theme == 'light' && activeTab == 'followers' ? 'bg-emerald-700 text-white' : ''} ${theme != 'light' && activeTab == 'followers' ? 'bg-emerald-700 text-white' : ''} font-semibold w-1/3 px-4 py-2  rounded-t-lg`}
          >
            Followers
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`${theme == 'light' && activeTab != "following" ? 'bg-white text-emerald-700' : ''} ${theme != 'light' && activeTab != "following" ? 'bg-gray-900 text-white' : ''} ${theme == 'light' && activeTab == 'following' ? 'bg-emerald-700 text-white' : ''} ${theme != 'light' && activeTab == 'following' ? 'bg-emerald-700 text-white' : ''} font-semibold w-1/3 px-4 py-2  rounded-t-lg`}
          >
            Following
          </button>
        </div>
        <div className={`${theme == 'light' ? '' : 'bg-gray-900'} p-4 shadow-md rounded-b-lg h-full overflow-auto`}>
          {activeTab === 'repos' && (
            repos.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className={`${theme == 'light' ? '' : 'bg-gray-950'}  border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
                  >
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-emerald-700">
                      <h2 className="text-xl font-bold">{repo.name}</h2>
                    </a>
                    <p className="text-gray-600">{repo.description}</p>
                    <div className="mt-2 flex justify-between text-sm text-gray-600">
                      <span className='flex justify-center items-center'><FaCode className='text-emerald-700 '/> {repo.language}</span>
                      <span className='flex justify-center items-center'><FaStar className='text-emerald-700'/> {repo.stargazers_count} Stars</span>
                      <span className='flex justify-center items-center'><RiGitForkFill className='text-emerald-700'/> {repo.forks_count} Forks</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${theme == 'light' ? '' : 'text-white'} text-center flex justify-center items-center h-full`}>Oops! Doesn't have any repositories yet.</div>
            )
          )}
          {activeTab === 'followers' && (
            followers.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {followers.map((follower) => (
                  <div
                    key={follower.id}
                    className={`${theme == 'light' ? '' : 'bg-gray-950'} border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer flex items-center`}
                  >
                    <img
                      src={follower.avatar_url}
                      alt={`${follower.login} avatar`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <a href={follower.html_url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 flex-grow font-bold">
                     {follower.login}
                    </a>
                    <span className="text-gray-400 cursor-pointer" onClick={() => history(`/user/${follower.login}`)}><IoIosNavigate className='text-emerald-700'/></span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${theme == 'light' ? '' : 'text-white'} text-center flex justify-center items-center h-full`}>Oops! Doesn't have any followers yet.</div>
            )
          )}
          {activeTab === 'following' && (
            following.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {following.map((follow) => (
                  <div
                    key={follow.id}
                    className={`${theme == 'light' ? '' : 'bg-gray-950'} border p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer flex items-center`}
                  >
                    <img
                      src={follow.avatar_url}
                      alt={`${follow.login} avatar`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <a href={follow.html_url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 flex-grow font-bold">
                      {follow.login}
                    </a>
                    <span className="text-gray-400 cursor-pointer" onClick={() => history(`/user/${follow.login}`)}><IoIosNavigate className='text-emerald-700'/></span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${theme == 'light' ? '' : 'text-white'} text-center flex justify-center items-center h-full`}>Oops! Doesn't have any following yet.</div>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default UserSearch;
