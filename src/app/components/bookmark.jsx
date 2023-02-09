import React, {useState} from "react";
import api from "../api";

// const Bookmark = (id) => {
//     const [users, setUsers] = useState(api.users.fetchAll());
//
//     setUsers(users.map(el => {
//         if(el._id === id && !el.bookmark){
//             el.bookmark = true
//         } else if (el._id === id && el.bookmark){
//             el.bookmark = false
//         }
//         return el
//     }))
// }

// export default Bookmark