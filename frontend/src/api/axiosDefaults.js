import axios from 'axios';

axios.defaults.baseURL = 'https://8000-luayidriss-politicus-awte4re8lb5.ws-eu105.gitpod.io'; 
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();