import { Routes,Route } from "react-router-dom";
import { routes } from "./routerConfig";
import { RouteConfig } from "../interfaces/types";

export const AppRouter = () => {

    return (

        <Routes>
            {
                routes.map((route:RouteConfig, index:number) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))
            }
        </Routes>
    )
}