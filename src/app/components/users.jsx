import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1); // на какой странице сейчас нахожимся
    const [professions, setProfession] = useState();// создаем пустой массив с помощью хука и далее в useEffect получаем ассинхронный запрос и добавляем его в массив
    const [selectedProf, setSelectedProf] = useState(); // выбранная проффесия
    const pageSize = 4; // отображает количество персон на одной странице

    useEffect(() => {
        api.professions.fetchAll().then((data) => { setProfession(data); }); // get async request & add in arr professions
    }, []);
    useEffect(() => { // следим за состоянием selectedProf, если была изменена т.е.(выбрана какая либо профф) то переводит на начал.страницу (1)
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const usersFilter = // фильтруем юзеров. принажатом фильтре
        selectedProf
            ? allUsers.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) // в фильтре Сравниваем проффес. юзеров. с выбранной проффес.
            : allUsers;
    const count = usersFilter.length;
    const usersCrop = paginate(usersFilter, currentPage, pageSize); // получаем массив obj с помощью метода в utils для отображения отфильтрованных юзеров.

    const clearFilter = () => { // сбрасывает значение в фильтре (кнопка очистить)
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {/* передаём groupList параметры (проффессии, ид, имя), также создали условие чтоы не получать undefined от ассин. запроса */}
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect} // передаем метод который устанав.знач. в setCurrentPage
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />  {/* показывает колич.Людей которые тусанут */}
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Провфессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => ( // рендерит тот самы массив объектов
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination // в компонент передаем параметры
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
