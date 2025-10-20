import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
    console.log("user:", user);
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
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-success">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
