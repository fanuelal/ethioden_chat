import axios from '@babel/core'
const axiosInstatn = axios.create()
axiosInstatn.default.header.common['Authorization'] = 'Bearer TOKEN ';

export default axiosInstatn;