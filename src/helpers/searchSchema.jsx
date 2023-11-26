import * as yup from 'yup';

export const searchSchema = yup.object().shape({
  search: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я\d\s'-_]+$/, 'Invalid characters found'),
});
