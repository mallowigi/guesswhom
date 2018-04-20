import * as axios from 'axios';

export default {
  getLogos() {
    return axios.get('http://localhost:5000/logos');
  },
};
