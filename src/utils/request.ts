import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { Snackbar } from '@varlet/ui'
import { localStorage } from '@/utils/local-storage'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'

// This is the Token KEY used to set the request backend.
// You can modify it according to your own needs, such as Access-Token，Authorization
// It should be noted that please try to use the horizontal line `-` as the separator
// Avoid discarding custom request headers by load balancers such as nginx
export const REQUEST_TOKEN_KEY = 'Access-Token'

// Create an axios instance
const request = axios.create({
  // API Default prefix for requests
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 6000, // Request timeout
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// Abnormal interception processor
function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 No permission
    if (status === 403)
      Snackbar({ type: 'warning', content: (data && data.message) || statusText })

    // 401 Not logged in/Unauthorized
    if (status === 401 && data.result && data.result.isLogin)
      Snackbar({ type: 'warning', content: 'Authorization verification failed' })
      // If you need to jump directly to the login page
      // location.replace(loginRoutePath)
  }
  return Promise.reject(error)
}

// Request interceptor
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  const savedToken = localStorage.get(STORAGE_TOKEN_KEY)
  // If the token exists
  // Let each request carry a custom token, please modify it according to the actual situation.
  if (savedToken)
    config.headers[REQUEST_TOKEN_KEY] = savedToken

  return config
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// Response interceptor
function responseHandler(response: { data: any }) {
  return response.data
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

export default request
