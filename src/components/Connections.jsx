import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/store/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                console.log("connections:", response.data.data);
                dispatch(addConnection(response.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) {
        return;
    }
    if (connections.length === 0) {
        return <div>No connections found</div>;
    }

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Your Connections</h1>
            <div className="flex flex-col gap-4 mt-5 w-1/3 mx-auto">
                {connections?.map((connection) => {
                    const { firstName, lastName, photoUrl } = connection;
                    return (
                        <div
                            className="flex item-center gap-3 p-5 rounded-md bg-gray-600 shadow"
                            key={connection._id}
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
                                <p>{connection.about}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;
