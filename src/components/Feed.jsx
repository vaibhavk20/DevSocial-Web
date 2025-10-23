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

    if (!feedData) return;

    if (feedData.length <= 0) {
        return (
            <h1 className=" flex justify-center m-52 text-3xl">
                No more users!!!!
            </h1>
        );
    }

    return (
        feedData && (
            <div className="flex flex-col items-center gap-4 my-5">
                <UserCard user={feedData[0]} />
            </div>
        )
    );

    // return (
    //     feedData && (
    //         <div className="flex justify-center align-middle">
    //             {/* <UserCard user={feedData[0]} /> */}
    //             {feedData?.map((user) => (
    //                 <UserCard key={user._id} user={user} />
    //             ))}
    //         </div>
    //     )
    // );
};

export default Feed;
