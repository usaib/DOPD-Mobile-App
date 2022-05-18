import axios from 'axios';
import {BASE_URL} from '../../App';

const createDiagnosedDisease = async params => {
  console.log(params);
  return axios.post(BASE_URL + '/diagnosedDisease/create', params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateDiagnosedDisease = async params => {
  console.log(params);
  return axios.post(BASE_URL + '/diagnosedDisease/update', params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const fetchDiagnosedDiseaseDetails = async params => {
  return axios.post(
    BASE_URL + '/diagnosedDisease/getDiagnosedDiseaseDetails',
    params,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export {
  createDiagnosedDisease,
  fetchDiagnosedDiseaseDetails,
  updateDiagnosedDisease,
};
