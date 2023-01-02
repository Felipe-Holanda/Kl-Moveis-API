import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export const registerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean()
});

export const updateUserSchema = yup.object().shape({
    uuid: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
});

export const deleteUserSchema = yup.object().shape({
    uuid: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
});

export const createCategorySchema = yup.object().shape({
    name: yup.string().required()
});

export const registerPropertySchema = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object().shape({
        district: yup.string().required(),
        zipCode: yup.string().required().length(8),
        number: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required().length(2)
    }).required(),
    categoryId: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'Invalid category id.'),
});

export const uuidValidate = yup.object().shape({
    uuid: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'invalid id.'),
});

export const createScheduleSchema = yup.object().shape({
    propertyId: yup.string().required().matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, 'Invalid property id.'),
    date: yup.date().required(),
    time: yup.string().required()
})

// interfaces 

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
}

export interface IUpdateUser {
    uuid: string;
    name?: string;
    email?: string;
    password?: string;
}