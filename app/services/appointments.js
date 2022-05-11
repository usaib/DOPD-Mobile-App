import axios from 'axios';
const BASE_URL = 'https://07d3-103-196-161-237.ngrok.io';
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

export {fetchAppointments};
