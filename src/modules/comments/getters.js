export default {
  comments(state) {
    return state.comments;
  },
  hasComments(state) {
    return state.comments && state.comments.length > 0;
  },
  commentsLength(state) {
    return state.comments.length;
  },
  isCommented(_/*state*/, getters, _2/*rootState*/, rootGetters) {
    const comments = getters.comments;
    const userId = rootGetters.userId;
    return comments.some(coach => coach.id === userId);
  }
};