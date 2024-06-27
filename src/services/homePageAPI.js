import api from './axiosInstance';

const homePageAPI = {
  HomeSearch: body => {
    const url = '/homeSearch/';
    return api.post(url, body);
  }
};

export default homePageAPI;
