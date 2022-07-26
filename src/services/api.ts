import axios from 'axios'
export const instance = axios.create({
    baseURL:'http://192.168.1.107:8080/api',
    timeout:5000
})