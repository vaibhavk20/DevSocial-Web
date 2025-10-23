import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/store/feedSlice";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const UserCard = ({ user, hide = false }) => {
    const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
        user || {};
    const dispatch = useDispatch();

    const handleSendRequest = async (status, toUserId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/request/send/${status}/${toUserId}`,
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                dispatch(removeUserFromFeed(toUserId));
                // showSuccessToast(`Request ${status} successfully`);
            }
        } catch (error) {
            showErrorToast("Something went wrong while sending request");
            console.error(error);
        }
    };

    return (
        <div className="card bg-gray-700 w-96 shadow-sm">
            <div className="flex justify-center p-2">
                <img
                    src={photoUrl}
                    alt="Profile"
                    className="h-40 w-32 object-cover"
                />
            </div>
            <div className="card-body text-center">
                <h2 className="card-title text-lg justify-center">
                    {firstName} {lastName}
                </h2>
                {age && gender && (
                    <p className="text-sm text-gray-300">
                        {age || 18}, {gender || "Male"}
                    </p>
                )}
                <p className="text-gray-200">{about}</p>

                {skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="badge badge-outline text-xs p-2"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {!hide && (
                    <div className="card-actions justify-center mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;
