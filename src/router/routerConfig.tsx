import {Home, UserSearch, RepositorySearch, Error} from '../pages';

export const routes = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: 'user/:username',
        element: <UserSearch/>
    },
    {
        path: 'repository/:username/:repository',
        element: <RepositorySearch/>
    },
    {
        path: '*',
        element: <Error/>
    }
];