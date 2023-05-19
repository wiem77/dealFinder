import axios from 'axios';
import { baseUrl } from '../config/config';

async function authenticate({ email, password }) {
  console.log('test', email, password);
  const url = `${baseUrl}signIn`;

  const response = await axios.post(url, {
    email: email.toLowerCase(),
    password: password,
  });
  console.log('dataaaaaaaa', response.data);
  const token = response.data.accessToken;
  const user = response.data.user;
  console.log('user', user);
  return { token, user };
}
export function login({ email, password }) {
  return authenticate({ email, password });
}
