import axios from 'axios';
const BASE_URL = 'https://mean-tips-repair-27-96-94-243.loca.lt';
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
