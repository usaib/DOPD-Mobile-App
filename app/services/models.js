import axios from 'axios';
const BASE_URL =
  'https://17gs3ovzcd.execute-api.us-east-1.amazonaws.com/prod/detect';
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
