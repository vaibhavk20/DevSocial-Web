import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

// 1. Define the routes as an array of objects
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        // Built-in error handling
        errorElement: <ErrorPage />,
        // Built-in data loading
        // loader: rootLoader,
        children: [
            {
                index: true,
                element: <Feed />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            { path: "/profile", element: <Profile /> },
            { path: "/connections", element: <Connections /> },
            { path: "/requests", element: <Requests /> },
        ],
    },
]);

// 2. Use the RouterProvider component
function App() {
    return (
        <>
            <Provider store={appStore}>
                <RouterProvider router={router} />
                <ToastContainer />
            </Provider>
        </>
    );
}

export default App;
