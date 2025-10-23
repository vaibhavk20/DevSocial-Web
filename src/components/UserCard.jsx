import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/store/feedSlice";

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
        user;
    console.log("user:", user);
    const dispatch = useDispatch();

    const handelSendRequest = async (status, toUserId) => {
        try {
            // API call to send connection request
            // const allowedStatus = ["ignored", "interested"];

            const response = await axios.post(
                `${BASE_URL}/request/send/${status}/${toUserId}`,
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                // Handle successful request
                console.log("Connection request sent successfully");
                dispatch(removeUserFromFeed(toUserId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="card bg-gray-700  w-96 shadow-sm">
                <div className="flex justify-center ">
                    <img src={photoUrl} alt="profil pic" />
                </div>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>
                        {age ? age : 18}, {gender ? gender : "Male"}
                    </p>
                    <p>{about}</p>
                    {/* <p>{skills.split(",")}</p> */}
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => handelSendRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-success"
                            onClick={() => handelSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
