import { PATH } from '~/routes';
import api from './axiosInstance';

const AuthAPI = {
  login: body => {
    const url = `/auth/${PATH.LOGIN}`;
    return api.post(url, body);
  },
  signup: body => {
    const url = `/auth/${PATH.SIGNUP}`;
    return api.post(url, body);
  },
  getCode: body => {
    const url = 'auth/verify-mail';
    const mail = { receiverMail: body };
    return api.post(url, mail);
  },
  fetchCurrentUser: () => {
    const url = '/auth/current-user';
    return api.get(url);
  },
  getUserByNameOrId: body => {
    const url = `/auth/find-user/?user=${body}&limit=10`;

    return api.get(url);
  },
  verifyGoogleCount: body => {
    const url = 'auth/verify-google-account';
    return api.post(url, body);
  }
};

export default AuthAPI;
