import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('First name is required').min(3),
  fathername: yup.string().required('Last name is required').min(3),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required').min(8),
  number: yup.string().required('Phone number is required').min(11),
  age: yup.number().required('Age is required').min(10),
});

export const loginSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});
