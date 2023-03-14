import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });
    const handleOnClick = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h1>completedMeetings: {user.completedMeetings}</h1>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleOnClick}> Все Пользователи</button>
            </div>
        );
    } else {
        return <h1>Loader</h1>;
    };
};

export default UserPage;

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
