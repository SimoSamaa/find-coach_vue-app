export default {
  requests(state) {
    return state.requests;
  },
  requestsLen(state) {
    return state.requests.length;
  },
  hasRequests(state) {
    return state.requests && state.requests.length > 0;
  },
  checkRequests(state) {
    return state.requests && state.requests.length >= 2;
  },
};
