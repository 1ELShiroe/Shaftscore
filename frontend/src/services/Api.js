import Axios from 'axios'
export const BASE_URL = 'http://localhost:8087/api'

const Api = Axios.create({
    baseURL: BASE_URL
})


export default Api