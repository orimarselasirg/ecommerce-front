import axios from 'axios'

const baseUrl = "http://localhost:8080/api/v1"

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api