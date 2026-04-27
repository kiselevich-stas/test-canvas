import axios from 'axios'
import Cookies from 'js-cookie'

const httpClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    timeout: 1000000,
})

httpClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        config.headers['x-lang'] = 'ru'

        return config
    },
    (error) => Promise.reject(error),
)

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove('accessToken')
            window.location.href = '/login'
        }

        return Promise.reject(error)
    },
)

export default httpClient