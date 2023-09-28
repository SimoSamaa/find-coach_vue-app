export default {
  coaches(state) {
    return state.coaches;
  },
  checkCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_/*state*/, getters, _2/*rootState*/, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },
  importUpdate(state) {
    const lastFetch = state.lastFetch;
    const currentTimeStamp = new Date().getTime();
    if(lastFetch === null) return true;
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};