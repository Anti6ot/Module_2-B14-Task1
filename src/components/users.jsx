import React, {useState} from "react";
import api from '../api';

const Users = () => {
    const fetchUsers = api.users.fetchAll()
    const [users, setUsers] = useState(fetchUsers)

    const handleDelete = (userId) => {

        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }


    const renderPhrase = (number) => {

        if(number === 1 || number > 4){
            return  <span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span>
        }
        if (number === 2 || number === 3 || number === 4){
            return  <span className="badge bg-primary">{number} человека тусанет с тобой сегодня</span>
        }
        if(number === 0) {
            return <span className="badge bg-danger">никто не тусанет с тобой сегодня</span>
        }
    }

    const renderUsers = () => {
       return  users.map(user => {
            return <tr
                key = {user._id}
            >
                <td> {user.name} </td>
                <td> {qualitiesRender(user.qualities)} </td>
                <td> {user.profession.name} </td>
                <td> {user.completedMeetings} </td>
                <td> {user.rate} </td>
                <td><button className="btn btn-danger" onClick={() => handleDelete(user._id)}> delete </button></td>
            </tr>
        })
    }

    const qualitiesRender = (id) => {

        const qualitiesArr = id.map(
        el => {
            let classColor = `badge bg-${el.color}`
           return <span
               key={el._id}
               className ={classColor}>
               {el.name}
           </span>
        })
        return qualitiesArr
    }

    return <React.Fragment>
        <h1>{renderPhrase(users.length)}</h1>
        <table className="table">
        <thead>
        <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
        </tr>
        </thead>
        <tbody>
        {renderUsers()}
        </tbody>
        </table>
        </React.Fragment>

};
export default Users;