import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";

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
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

// 2. Use the RouterProvider component
function App() {
    return <RouterProvider router={router} />;
}

export default App;
