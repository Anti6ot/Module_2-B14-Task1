import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import PropTypes from "prop-types";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1); // на какой странице сейчас находимся
    const [professions, setProfession] = useState();// создаем пустой массив с помощью хука и далее в useEffect получаем ассинхронный запрос и добавляем его в массив
    const [selectedProf, setSelectedProf] = useState(); // выбранная профеcсия
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState(); // оставляем пустым для useEffect который получает ассинх.запрос
    // ====
    const [searchQuery, setSearchQuery] = useState(""); // input
    const pageSize = 8; // отображает количество персон на одной странице

    useEffect(() => {
        api.professions.fetchAll().then((data) => { setProfession(data); }); // get async request & add in arr professions
    }, []);

    useEffect(() => { // следим за состоянием selectedProf, если была изменена т.е.(выбрана какая либо профф) то переводит на начал.страницу (1)
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data)); // получаем ассинхронный запрос и добавляем в users
    }, []);

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

    const handleProfessionSelect = item => {
        if (searchQuery !== "") {
            setSearchQuery("");
        };
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    // ==============================
    const handleSearchQuery = (e) => {
        setSelectedProf(undefined);
        setSearchQuery((e.target.value));
    };

    if (users) {
        const usersFilter = // фильтруем юзеров. принажатом фильтре
            searchQuery // при условии если у нас в поиске есть значения то ...
                ? users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) // фильтруем пользователей
                : selectedProf
                    ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) // в фильтре Сравниваем проффес. юзеров. с выбранной проффес.
                    : users;
        const count = usersFilter.length;
        const sortedUsers = _.orderBy(usersFilter, [sortBy.path], [sortBy.order]); // сортировка по параметрам
        const usersCrop = paginate(sortedUsers, currentPage, pageSize); // получаем массив obj с помощью метода в utils для отображения отфильтрованных юзеров.

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
                    <input type="text" name="Search" value={searchQuery} onChange={handleSearchQuery} placeholder="search" />

                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return "loading...";
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
