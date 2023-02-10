import React, {useState} from "react";
import api from "./api";
import SearchStatus from "./components/searchStatus";
import User from "./components/user";

function App(){

    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    return (
        <>
            <h2>
                {SearchStatus(users)}
            </h2>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <User
                                onUser={user}
                                onUsers={users}
                                onDel={handleDelete}

                            />
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default App