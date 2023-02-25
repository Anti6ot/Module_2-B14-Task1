import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api"; // импортируем фейковый апи

function App() {
    const [users, setUsers] = useState(); // оставляем пустым для useEffect

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data)); // получаем ассинхронный ответ и добавляем в users
    }, []);
    console.log(users);
    // if (!users) { // условие для того чтобы пока подгружаются юзеры не было ошибки
    //     return (
    //         <div>загрузка...</div>
    //     );
    // } else {
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <div>
            {users && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            )}
        </div>
    );
    // };
}

export default App;

// function App() {
//     const [users, setUsers] = useState();

//     useEffect(() => {
//         api.users.fetchAll().then((data) => setUsers(data));
//     }, []);

//     const handleDelete = (userId) => {
//         setUsers(users.filter((user) => user._id !== userId));
//     };

//     const handleToggleBookMark = (id) => {
//         setUsers(
//             users.map((user) => {
//                 if (user._id === id) {
//                     return { ...user, bookmark: !user.bookmark };
//                 }
//                 return user;
//             })
//         );
//     };
//     return (
//         <div>
//             {users && (
//                 <Users
//                     onDelete={handleDelete}
//                     onToggleBookMark={handleToggleBookMark}
//                     users={users}
//                 />
//             )}
//         </div>
//     );
// }

// export default App;
