
export default {
  addRequests(state, payload) {
    state.requests.unshift(payload);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  deleteRequest(state, requestId) {
    state.requests = state.requests.filter((req) => req.id !== requestId);
  },
  delyeAllReq(state) {
    state.requests = [];
  },
  requestsNotification(state) {

    console.log('hihi', state.requestsLen);
  }
};
