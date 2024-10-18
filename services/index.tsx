import axios from 'axios'

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://54.224.36.64:8080/'

export const backendApi = axios.create({ baseURL: BACKEND_URL })
