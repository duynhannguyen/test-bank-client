import api from './axiosInstance';

const TestAPI = {
  create: () => {
    const url = '/tests';
    return api.post(url);
  },
  getTestById: id => {
    const url = `/tests/${id}`;
    return api.get(url);
  },
  getTestOverviewById: id => {
    const url = `/tests/overview/${id}`;
    return api.get(url);
  },
  updateTestById: (id, body) => {
    const url = `/tests/${id}`;
    return api.put(url, body);
  },
  getMyTests: () => {
    const url = '/tests/mine';
    return api.get(url);
  },
  getActiveTests: id => {
    const url = `/tests/active-tests/${id}`;
    return api.get(url);
  },
  updateCommonFields: (id, body) => {
    const url = `/tests/common/${id}`;
    return api.put(url, body);
  }
};

export default TestAPI;
