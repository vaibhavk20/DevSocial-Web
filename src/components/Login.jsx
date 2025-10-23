import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../utils/store/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true); // true for login, false for signup
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
            setError(error.response.data);
            console.error("Login failed:", error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL}/signup`,
                {
                    emailId: email,
                    password,
                    firstName,
                    lastName,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log("signup response", response.data);
                dispatch(login(response.data.user));
                // Redirect to home page or dashboard
                navigate("/profile");
            }
            console.log("SignUp successful:", response.data);
        } catch (error) {
            setError(error.response.data);
            console.error("SignUp failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl">
                        {isLoginForm ? "Login" : "SignUp"}
                    </h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        First Name :
                                    </legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Last Name :
                                    </legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </fieldset>
                            </>
                        )}
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
                    <p className="text-red-500 text-center">{error}</p>

                    <div className="card-actions justify-center mt-2">
                        <button
                            className="btn"
                            onClick={isLoginForm ? handleLogin : handleSignup}
                        >
                            {isLoginForm ? "Login" : "Signup"}
                        </button>
                    </div>

                    <p
                        className=" text-center cursor-pointer py-2"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New user ? signup here"
                            : "Existing User ? Login here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
