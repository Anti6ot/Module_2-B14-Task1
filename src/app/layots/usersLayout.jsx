import React from "react";
import { useParams } from "react-router-dom";
import Users from "../components/users";
import UserPage from "../components/userPage";

const UsersLayout = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <div>
            {userId ? <UserPage userId={userId}/> : <Users/>}
        </div>
    );
};

export default UsersLayout;
