import axios from 'axios';

export const getUserData = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching user data');
  }
};

export const getRepoData = async (username: string, repository: string) => {
  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
    
    const repo = reposResponse.data.find(repo => repo.name === repository);
    
    if (!repo) {
      return {
        user: userResponse.data,
        repo: null
      };
    }
    
    return {
      user: userResponse.data,
      repo: repo
    };
  } catch (err) {
    throw new Error('Error fetching repository data');
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching user repositories data');
  }
};

export const getUserFollowers = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/followers`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching user followers data');
  }
};

export const getUserFollowing = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/following`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching user following data');
  }
};
