import api from './axiosInstance';

const QuizRoomAPI = {
  create: body => {
    const url = '/quizRooms';
    return api.post(url, body);
  },
  getById: id => {
    const url = `/quizRooms/${id}`;
    return api.get(url);
  }
};

export default QuizRoomAPI;
