import { React, useState, useEffect } from "react";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
// import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";

const UserEdit = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState(
        {
            email: "",
            name: "",
            profession: "",
            sex: "male",
            qualities: []
        });

    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser((prevState) => ({
            ...prevState,
            ...data,
            profession: data.profession._id,
            qualities: data.qualities.map((qual) => ({
                label: qual.name,
                value: qual._id
            }))
        })));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [user]);
    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = user;

        api.users.update(userId, {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)

        }).then(() => { history.push(`/users/${userId}`); });
    };
    return (
        <>
            {user._id && professions && qualities && (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <TextField
                        label="Name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption="Choose..."
                        options={professions}
                        name="profession"
                        onChange={handleChange}
                        value={user.profession._id}
                        error={errors.profession}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={user.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={user.qualities}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        disabled={!isValid}
                    >
                        Submit
                    </button>
                </form>
            )}

        </>
    );
};

// UserEdit.propTypes = {
//     userId: PropTypes.string.isRequired
// };
export default UserEdit;
