import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import React, {useState} from "react";

const User = (props) => {
    const {onUser, onUsers, onDel} = props
    const [users, setUsers] = useState(onUsers)
    return (<>
            <td>{onUser.name}</td>
            <td>{Qualitie(onUser.qualities)}</td>
            <td>{onUser.profession.name}</td>
            <td>{onUser.completedMeetings}</td>
            <td>{onUser.rate} /5</td>
            <td>

                <button
                className= {"bi " + (onUser.bookmark ? "bi-flag-fill" : "bi-flag")}
                onClick={()=> setUsers(Bookmark(onUser._id, users))
                }
            >
            </button>
            </td>
            <td>
                <button
                    onClick={() => onDel(onUser._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
    </>
    )
}
export default User