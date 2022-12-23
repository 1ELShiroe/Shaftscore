import Axios from 'axios'
const BASE_URL = 'http://154.12.226.71:8087/api'

const Api = Axios.create({
    baseURL: BASE_URL
})


export default Api