import api from './axiosInstance';

const CollectionAPI = {
  create: body => {
    const url = '/collections';
    return api.post(url, body);
  },
  getMyCollections: () => {
    const url = '/collections/mine';
    return api.get(url);
  }
};

export default CollectionAPI;
