export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuth(state) { // to check if the user login
    return !!state.token;
  }
};
