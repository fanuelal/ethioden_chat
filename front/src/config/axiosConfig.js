import axios from 'axios';

const axiosConfig = axios.create({

  headers: {
    'Authorization': 'Bearer ${token}'
  }
});

export default axiosConfig;
