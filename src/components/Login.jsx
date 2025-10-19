import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

const Login = () => {
    const [email, setEmail] = useState("rohitsharma@gmail.com");
    const [password, setPassword] = useState("Rohit@123");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId: email,
                    password,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                dispatch(login(response.data.user));
                // Redirect to home page or dashboard
                navigate("/");
            }
            console.log("Login successful:", response.data);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Type here"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Password
                            </legend>
                            <input
                                type="Password"
                                className="input"
                                placeholder="Type here"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
