import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { login } from "../utils/store/userSlice";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [age, setAge] = useState(user.age || "");
    const [skills, setSkills] = useState(user.skills || []);
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
    const [gender, setGender] = useState(user.gender || "Male");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    age,
                    skills,
                    about,
                    photoUrl,
                    gender,
                },
                { withCredentials: true }
            );

            if (response.status === 200) {
                dispatch(login(response.data.data));
                showSuccessToast("Profile updated successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            showErrorToast("Failed to update profile!");
        }
    };

    return (
        <div className="flex justify-center gap-6 p-4">
            {/* Edit Form */}
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input
                            type="text"
                            className="input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input
                            type="text"
                            className="input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo</legend>
                        <input
                            type="text"
                            className="input"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input
                            type="text"
                            className="input"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About</legend>
                        <input
                            type="text"
                            className="input"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <select
                            className="input"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Skills</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Comma separated e.g. React, Node, SQL"
                            value={skills.join(", ")}
                            onChange={(e) =>
                                setSkills(
                                    e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                )
                            }
                        />
                    </fieldset>

                    <div className="card-actions justify-center mt-3">
                        <button className="btn" onClick={handleSave}>
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>

            <div>
                {/* Live Preview */}
                <UserCard
                    user={{
                        firstName,
                        lastName,
                        age,
                        about,
                        photoUrl,
                        gender,
                        skills,
                    }}
                    hide={true}
                />
            </div>
        </div>
    );
};

export default EditProfile;
