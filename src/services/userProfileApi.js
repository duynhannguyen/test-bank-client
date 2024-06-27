import api from './axiosInstance';
const userAPI = {
  uploadImage: (userId, body) => {
    const url = `/user-profile/${userId}/upload-profileimg`;
    return api.put(url, body);
  },
  updateInfo: (userId, body) => {
    const url = `/user-profile/${userId}/update-profile`;
    return api.put(url, body);
  }
};

export default userAPI;
