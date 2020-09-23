import axios from 'axios';
import { BASE_API_URL } from '../../constants/api.const';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    post: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
    },
  },
});

// const registerIntercepters = (axiosInst) => {
//   // config interceptors for axiosInst
// };

// registerIntercepters(axiosInstance);

export default axiosInstance;
