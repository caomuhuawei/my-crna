import axios from '../config/axios.config';
import api from '../config/apis.config';

const {login} = api.account;

export default {
  login: (params) => {
    const {DES, RSA} = params;
    return axios.post(login, {
      data: DES,
      options: {
        headers: {
          Encryption: RSA,
        },
      },
    });
  },
};
