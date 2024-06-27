import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

//Interceptors : antes de cada request tomamos el token y si existe le inyectamos el token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api