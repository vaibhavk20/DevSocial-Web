import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/store/requestsSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/user/requests/recieved`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                console.log("Requests:z", response.data.data);
                dispatch(addRequests(response.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) {
        return;
    }
    if (requests.length === 0) {
        return <div>No requests found</div>;
    }

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Your Requests</h1>
            <div className="flex flex-col gap-4 mt-5 w-2/3 mx-auto align-middle justify-between">
                {requests?.map((request) => {
                    const { firstName, lastName, photoUrl, about } =
                        request.fromUserId;
                    return (
                        <div
                            className="flex item-center gap-3 p-5 rounded-md bg-gray-600 shadow"
                            key={request._id}
                        >
                            <div>
                                <img
                                    src={photoUrl}
                                    alt={`${firstName} ${lastName}`}
                                    width="50"
                                    height="50"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="text-left">
                                <h4 className="text-lg font-semibold">
                                    {firstName} {lastName}
                                </h4>
                                <p>{about}</p>
                            </div>
                            <div className="flex  ml-auto justify-center items-center gap-2">
                                <button className="btn btn-sm btn-primary mr-2">
                                    Accept
                                </button>
                                <button className="btn btn-sm btn-secondary">
                                    Reject
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;
