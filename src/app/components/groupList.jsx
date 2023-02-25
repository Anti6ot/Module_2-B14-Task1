import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ // в качестве параметров professions из users.jsx и доп параметры ид и имя и тд.
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const getArray = (items) => { // проверка items на массив (если это объект то возвращиет значения)
        return Array.isArray(items) ? items : Object.values(items);
    };

    return (
        <ul className='list-group'>
            {getArray(items).map((item) => (
                <li
                    key={item[valueProperty]}
                    className={
                        "list-group-item" + (item === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(item)} // передаем выбранную проффесию
                    role='button'
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = { // с помощью встроенного в реакт свойства можно задать параметры по умолчанию входящии в GroupList()
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = { // доп условия по входным параметрам
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired, // праметр может быть только объект
    valueProperty: PropTypes.string.isRequired, // праметр может быть только строка
    contentProperty: PropTypes.string.isRequired // праметр может быть только строка
};

export default GroupList;
