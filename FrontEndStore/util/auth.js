import axios from 'axios';
import { baseUrl } from '../config/config';
async function authenticate(accesscode) {
  const url = `${baseUrl}/store/loginStore`;

  const response = await axios.post(url, {
    accesscode: accesscode,
  });

  const token = response.data.accessToken;
  const store = response.data.store;
  console.log('store', store);
  return { token, store };
}
export function login(accesscode) {
  return authenticate(accesscode);
}
