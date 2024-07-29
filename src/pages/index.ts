import React from "react";
import Home from "../components/layout/home/Home";

export {Home}

export const UserSearch = React.lazy(() => import('../components/layout/userSearch/UserSearch'));
export const RepositorySearch = React.lazy(() => import('../components/layout/repositorySearch/RepositorySearch'));
export const Error = React.lazy(() => import('../components/layout/error/Error'));