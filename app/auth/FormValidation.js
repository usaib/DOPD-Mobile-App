import * as yup from 'yup';

export const registerSchema = yup.object({
  FirstName: yup.string().required('First name is required').min(3),
  LastName: yup.string().required('Last name is required').min(3),
  Email: yup.string().required('Email is required'),
  Password: yup.string().required('Password is required').min(8),
  PhoneNumber: yup.string().required('Phone number is required').min(11),
});

export const loginSchema = yup.object({
  Email: yup.string().required('Email is required'),
  Password: yup.string().required('Password is required'),
});
