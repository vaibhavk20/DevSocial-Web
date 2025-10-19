import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { logout } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        // Implement logout functionality here
        try {
            const response = await axios.post(
                `${BASE_URL}/logout`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                // Handle successful logout, e.g., redirect to login page
                dispatch(logout());
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-5">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">DevSocial</a>
            </div>

            {user.isAuthenticated && (
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={
                                        user.userInfo?.photoUrl ||
                                        "/default-avatar.png"
                                    }
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <p>
                                    {user.userInfo
                                        ? `${user.userInfo.firstName} ${
                                              user.userInfo.lastName ?? ""
                                          }`
                                        : "Guest"}
                                </p>
                            </li>
                            <li>
                                <NavLink to={"/profile"}>Profile</NavLink>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <NavLink onClick={handleLogout}>Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
