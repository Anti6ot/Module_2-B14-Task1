export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired":
            statusValidate = data.trim() === "";
            break;

        case "isEmail": {
            const emailReExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailReExp.test(data);
            break;
        }
        case "isCapital": {
            const passwordReExp = /[A-Z]+/g;
            statusValidate = !passwordReExp.test(data);
            break;
        }
        case "isContainDigit": {
            const containDigitReExp = /\d+/g;
            statusValidate = !containDigitReExp.test(data);
            break;
        }
        case "min": {
            statusValidate = config.value > data.length;
            break;
        }
        default:
            break;
        };
        if (statusValidate) return config.message;
    };
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        };
    };
    return errors;
};
