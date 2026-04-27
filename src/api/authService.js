import httpClient from '@/boot/axios'

export default {
    async getCaptcha() {
        const response = await httpClient.post('user/login/captcha')
        return response.data
    },

    async login(data) {
        const response = await httpClient.post('/oauth/token', {
            ...data,
            client_id: import.meta.env.VITE_APP_CLIENT_ID,
            client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
        })

        return response.data
    },

    async activeUser() {
        const response = await httpClient.post('user/get/data')
        return response.data
    },
}