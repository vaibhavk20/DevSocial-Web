import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/store/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        // Logic to fetch user data from backend

        try {
            const response = await axios.get(`${BASE_URL}/profile/view`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                console.log("User data fetched:", response.data);
                dispatch(login(response.data.user));
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Token expired or unauthorized
                navigate("/login");
            }
            console.error("token expired:", error);
        }
    };

    useEffect(() => {
        if (!userData.isAuthenticated) {
            fetchUser();
        }
    }, [userData.isAuthenticated]);

    return (
        <div>
            <Navbar />

            <div className="p-5">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default AppLayout;
