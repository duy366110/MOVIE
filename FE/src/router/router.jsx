import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// LOADER MAIN COMPONENT.
const PageHomeComponent = lazy(() => import("../Components/Pages/Page-Home-Component/Page-Home-Component"));
const PageSearchComponent = lazy(() => import("../Components/Pages/Page-Search-Component/Page-Search-Component"));
const PageExceptionErrorComponent = lazy(() => import("../Components/Pages/Exception/Page-Exception-Error-Component/Page-Exception-Error-Component"));


const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <PageExceptionErrorComponent />,
        children: [
            {
                index: true,
                path: "",
                loader: async () => import('../Components/Pages/Page-Home-Component/Page-Home-Component').then((module) => module.loader()),
                element: <Suspense fallback={<p>Please wait loader...</p>}><PageHomeComponent /></Suspense>,
            },
            {
                path: "search",
                loader: async () => import('../Components/Pages/Page-Search-Component/Page-Search-Component').then((module) => module.loader()),
                element: <Suspense fallback={<p>Please wait loader...</p>}><PageSearchComponent /></Suspense>,
            }
        ]
    },
    {
        path: '*',
        element: 'Not Found page'
    }
])

export default Router;