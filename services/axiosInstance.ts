import axios from 'axios'
import { APP_NAME, JWT_TOKEN_KEY } from 'constants/common'
import * as SecureStore from 'expo-secure-store'

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_CORE_SERVICE_API_URL,
  timeout: 3000,
  headers: {'X-Client-Id': APP_NAME},
})

axiosInstance.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItem(JWT_TOKEN_KEY);
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// instanceAxios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     const code = error && error.response ? error.response.status : 0
//     if (code === 401 || code === 403) {
//       console.log('error code', code)
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstance