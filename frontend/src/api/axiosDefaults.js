import axios from 'axios';

axios.defaults.baseURL = 'https://8000-luayidriss-politicus-t67mgwxasx1.ws-eu105.gitpod.io';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();