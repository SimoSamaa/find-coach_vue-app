import { createStore } from 'vuex';

import coachesModule from './coaches/index';
import requestsModule from './requests/index';
import authModule from './auth/index';
import commentsModule from './comments/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
    comments: commentsModule
  },
});

export default store;