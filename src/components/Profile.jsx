import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
    const userData = useSelector((store) => store.user.userInfo);
    // "firstName",
    //     "lastName",
    //     "age",
    //     "skills",
    //     "photoUrl",
    //     "about",

    console.log("user profiile:", userData);
    return (
        userData && (
            <div>
                <EditProfile
                    user={{
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        age: userData.age,
                        skills: userData.skills,
                        photoUrl: userData.photoUrl,
                        about: userData.about,
                        gender: userData.gender,
                    }}
                />
            </div>
        )
    );
};

export default Profile;
