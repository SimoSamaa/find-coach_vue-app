
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
  deleteAllReqs(state) {
    state.requests = [];
  },
  setIsOpen(state, { id, isOpen }) {
    const notification = state.requests.find(mess => mess.id === id);
    if(notification) {
      if(!notification.isOpen && isOpen) {
        notification.isOpen = true;
      }
    }
  }
};
