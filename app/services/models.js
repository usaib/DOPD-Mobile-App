import axios from 'axios';
const BASE_URL = 'https://easy-tips-raise-103-196-161-153.loca.lt';
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
