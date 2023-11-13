export default {
  setAddComments(state, payload) {
    state.comments.unshift(payload);
  },
  setFetchComments(state, payload) {
    state.comments = payload;
  },
};