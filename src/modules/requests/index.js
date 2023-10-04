import requestsMutations from './mutations';
import requestsActions from './actions';
import requestsGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      notifications: 1,
      requests: [],
    };
  },
  mutations: requestsMutations,
  actions: requestsActions,
  getters: requestsGetters,
};