import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feedData = useSelector((store) => store.feed);

    const fetchFeed = async () => {
        try {
            if (feedData) {
                return;
            }
            // Logic to fetch feed data from backend
            const response = await axios.get(`${BASE_URL}/feed`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                console.log("Feed data fetched:", response.data);
                // Handle feed data
                dispatch(addFeed(response.data.feed));
            }
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };
    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        feedData && (
            <div className="flex justify-center align-middle">
                <UserCard user={feedData[0]} />
            </div>
        )
        // feedData?.map((user) => <UserCard key={user._id} user={user} />)
    );
};

export default Feed;
