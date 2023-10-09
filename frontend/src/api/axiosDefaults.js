import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'http://localhost:8000',
//     timeout: 5000,
// });

// export default instance;

axios.defaults.baseURL = 'https://8000-luayidriss-politicus-kw4wnqaetu4.ws-eu105.gitpod.io'; 
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();