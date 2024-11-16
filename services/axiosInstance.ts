import axios from 'axios'
import { APP_NAME } from 'constants/common'
// import AsyncStorage from '@react-native-community/async-storage'

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_CORE_SERVICE_API_URL,
  timeout: 3000,
  headers: {'X-Client-Id': APP_NAME},
})

// instanceAxios.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('token')
//     config.headers.Authorization = `Bearer ${token}`
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

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