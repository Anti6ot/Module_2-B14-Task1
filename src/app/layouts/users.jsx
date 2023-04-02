import React from "react";
import { useParams } from "react-router-dom";
import UserEdit from "../components/page/userEdit/userEdit";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return <>{userId ? (edit ? <UserEdit/> : <UserPage userId={userId} />) : <UsersListPage />}</>;
};

export default Users;
