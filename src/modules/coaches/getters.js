export default {
  coaches(state) {
    return state.coaches;
  },
  checkCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(_/*state*/, getters, _2/*rootState*/, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  }
}