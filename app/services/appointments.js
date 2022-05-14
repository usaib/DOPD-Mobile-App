import axios from 'axios';
import {BASE_URL} from '../../App';
const fetchAppointments = async params => {
  return axios.post(
    BASE_URL + '/appointment/getAppointments',
    {
      limit: 10,
      offset: 0,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

const createAppointment = async params => {
  console.log(params);
  return axios.post(BASE_URL + '/appointment/create', params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export {fetchAppointments, createAppointment};
