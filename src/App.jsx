import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";

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
                element: <Home />,
            },
            { path: "/profile", element: <Profile /> },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

// 2. Use the RouterProvider component
function App() {
    return (
        <>
            <Provider store={appStore}>
                <RouterProvider router={router} />
            </Provider>
        </>
    );
}

export default App;
