import axios from 'axios';
const BASE_URL = 'http://192.168.0.106:5000';
const prediction = async params => {
  console.log('In service call', params);
  return axios.post(
    BASE_URL + '/api/model/prediction',
    {
      symptoms: params.symptoms,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export {prediction};
