import axios from 'axios';
import {BASE_URL} from '../../App';
export const getPrescription = async params => {
  return axios.post(`${BASE_URL}/prescription/getPrescriptionById`, {
    appointmentId: params.appointmentId,
  });
};
export const createPrescription = async params => {
  return axios.post(
    `${BASE_URL}/prescription/create`,
    {
      appointmentId: params.appointmentId,
      medicine: params.medicines,
      createAt: new Date(),
      updatedAt: new Date(),
    },
    {
      headers: {
        Authorization: 'Bearer ' + params.token,
      },
    },
  );
};

export const updateUser = async params => {
  return axios.post(
    `${BASE_URL}/prescription/updateUser`,
    {
      ...params,
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token', 0),
      },
    },
  );
};

export const remove = async params => {
  return axios.post(
    `${BASE_URL}/prescription/deleteUser`,
    {id: params.id},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token', 0),
      },
    },
  );
};
