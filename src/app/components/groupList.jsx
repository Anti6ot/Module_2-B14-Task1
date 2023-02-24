import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => { // в качестве параметров professions из users.jsx и доп параметры ид и имя и тд.
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map(item => ( // итерируемся по ключам объекта и рендерим данные\
                    <li
                        key={items[item][valueProperty]}
                        className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
                        onClick={() => onItemSelect(items[item])}
                        role="button" // эффект смены курсора
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        </>
    );
};

GroupList.defaultProps = { // с помощью встроенного в реакт свойства можно задать параметры по умолчанию входящии в GroupList()
    valueProperty: "_id",
    contentProperty: "name",
    selectedItem: {}
};

GroupList.propTypes = { // доп условия по входным параметрам
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object.isRequired,
    items: PropTypes.oneOfType([PropTypes.object]), // праметр может быть только объект
    valueProperty: PropTypes.string.isRequired, // праметр может быть только строка
    contentProperty: PropTypes.string.isRequired // праметр может быть только строка
};

export default GroupList;
