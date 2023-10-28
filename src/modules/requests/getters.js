export default {
  requests(state) {
    return state.requests;
  },
  hasRequests(state) {
    return state.requests && state.requests.length > 0;
  },
  checkRequests(state) {
    return state.requests && state.requests.length >= 2;
  },
  messagesNotification(state) {
    return Object.values(state.requests).reduce((total, message) => {
      return total + (message.isOpen ? 0 : state.notifications);
    }, 0);
  },
  notificationMess(state) {
    const notificationEmail = Array.from(Object.values(state.requests));
    return notificationEmail[ 0 ].userEmail;
  }
};
