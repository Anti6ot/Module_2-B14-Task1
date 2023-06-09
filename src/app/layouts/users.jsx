import React from "react";
import { useParams } from "react-router-dom";
import UserEdit from "../components/page/userEdit/userEdit";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

import UserProvider from "../hooks/useUsers";
const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <UserEdit />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
