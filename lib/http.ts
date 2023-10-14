import axios from 'axios'

const http = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export default http;
