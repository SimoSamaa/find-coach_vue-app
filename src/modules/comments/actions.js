const FIREBASE_LINK = 'https://test-coaches-find-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  async addComments(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const studentCommnets = {
      id: userId,
      date: Date.now(),
      name: payload.name,
      comment: payload.comment,
    };

    const sendReq = await fetch(`${ FIREBASE_LINK }/comments/${ payload.coachId }/comment-${ userId }.json?auth=${ token }`, {
      method: "PUT",
      body: JSON.stringify(studentCommnets)
    });

    if(!sendReq.ok) return;

    context.commit('setAddComments', studentCommnets);
  },
  async fetchComments(context, currentCoach) {
    const res = await fetch(`${ FIREBASE_LINK }/comments/${ currentCoach }.json`);
    const resCommnets = await res.json();

    if(!res.ok) {
      const error = new Error(resCommnets.message || "failed to comment");
      throw error;
    }

    const comments = [];

    for(const key in resCommnets) {
      const dataFetches = {
        id: resCommnets[ key ].id,
        date: resCommnets[ key ].date,
        name: resCommnets[ key ].name,
        comment: resCommnets[ key ].comment,
      };

      comments.unshift(dataFetches);
    }
    context.commit('setFetchComments', comments, currentCoach);
  }
};