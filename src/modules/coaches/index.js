import coachesMutations from './mutations';
import coachesActions from './actions';
import coachesGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: []
    };
  },
  mutations: coachesMutations,
  actions: coachesActions,
  getters: coachesGetters,
};