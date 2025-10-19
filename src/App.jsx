import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

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
