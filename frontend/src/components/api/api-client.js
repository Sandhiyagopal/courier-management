import axios from 'axios';

const baseUrl = import.meta.env.REACT_APP_API_URL || "/api"

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
})

apiClient.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // if (error.response?.status === 401) {
        //     window.location.href = "/login";
        // }
        return Promise.reject(error);
    }
);

export default apiClient;