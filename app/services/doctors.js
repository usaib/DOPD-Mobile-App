import axios from 'axios';
import {BASE_URL} from '../../App';

const fetchDoctors = async params => {
  return axios.post(BASE_URL + '/doctor/getAllDoctors', params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export {fetchDoctors};
