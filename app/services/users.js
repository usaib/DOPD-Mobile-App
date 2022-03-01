import axios from 'axios';
const BASE_URL = 'https://foolish-bulldog-50.loca.lt';
const fetchUser = async params => {
  console.log('In service call', params);
  return axios.post(
    BASE_URL + '/me',
    {
      id: params,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
const signIn = async params => {
  console.log('In service call', params);
  return axios.post(
    BASE_URL + '/signIn',
    {
      email: params.email,
      password: params.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

// const fetchuser = async () => {
//   try {
//     const response = await fetch('https://honest-cougar-88.loca.lt/me', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: 1,
//       }),
//     });
//     console.log(response);
//     const json = await response.json();
//     console.log(json);
//   } catch (e) {
//     console.log(e);
//   }
// };
// fetchuser();
export {fetchUser, signIn};
