import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { login } from "../utils/store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../utils/toast";

const EditProfile = ({ user }) => {
    const [fistname, setFirstname] = useState(user.firstName);
    const [lastname, setLastname] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [gender, setGender] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName: fistname,
                    lastName: lastname,
                    age,
                    skills,
                    about,
                    photoUrl,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log("profile saved.");
                dispatch(login(response.data.data));
                showSuccessToast("Profile updated successfully!");

                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex align-middle justify-center">
            <div className="flex justify-center items-center h-full">
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">
                            Edit Profile
                        </h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    First Name
                                </legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Type here"
                                    name="firstname"
                                    value={fistname}
                                    onChange={(e) =>
                                        setFirstname(e.target.value)
                                    }
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    Last Name
                                </legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Type here"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) =>
                                        setLastname(e.target.value)
                                    }
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    Photo{" "}
                                </legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Type here"
                                    name="photo"
                                    value={photoUrl}
                                    onChange={(e) =>
                                        setPhotoUrl(e.target.value)
                                    }
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    Age{" "}
                                </legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Type here"
                                    name="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    About{" "}
                                </legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Type here"
                                    name="about"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    Gender{" "}
                                </legend>
                                <select
                                    type="text"
                                    className="input"
                                    placeholder="Type here"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn" onClick={handleSave}>
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <UserCard
                user={{
                    firstName: fistname,
                    lastName: lastname,
                    age,
                    about,
                    photoUrl,
                    gender,
                    skills,
                }}
            />
        </div>
    );
};

export default EditProfile;
