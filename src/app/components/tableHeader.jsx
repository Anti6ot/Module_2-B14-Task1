import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) { // по условию возможна сортировка как в большую так и в меньшую сторону
            onSort({
                ...selectedSort, // копируем массив чтобы избежать мутации
                order: selectedSort.order === "asc" ? "desc" : "asc" // задаем order
            });
        } else {
            onSort({ path: item, order: "asc" }); // действие по умолчанию уст. ключ selSort в asc
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => ( // пробегаемся по ключам и рендерим. все необх значения
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                    </th>
                ))}
                <th />
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
