import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

/* REQUEST */
axiosClient.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

/* RESPONSE */
axiosClient.interceptors.response.use(
  response => response.data,
  error => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Có lỗi xảy ra';

    return Promise.reject(message);
  }
);

export default axiosClient;
