// All validations are grouped here, so that when a new page is created and
// some of the fields overlap, the code for these fields will be easily found

const validName = (value) => {
    return (
        value.length >= 2 && value.length <= 22 && /^[A-Za-z0-9]+$/.test(value)
    );
};

const validEmail = (value) => {
    return (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
    )
};

const validPassword = (value) => {
    return (
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(value)
    )
}

export const validateRegistrationField = (field, value) => {
    return (
        field === "name" ? validName(value) : 
        field === "email" ? validEmail(value) :
        field === "password" ? validPassword(value) : true
    )
};
