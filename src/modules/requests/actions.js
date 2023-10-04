const FIREBASE_LINK = 'https://test-coaches-find-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  async sendRequests(context, payload) {
    const newRequests = {
      id: payload.id,
      userEmail: payload.email,
      userMessage: payload.message,
      isOpen: false,
    };

    const sendReq = await fetch(`${ FIREBASE_LINK }/requests/${ payload.coachId }/request-${ newRequests.id }.json`, {
      method: "PUT",
      body: JSON.stringify(newRequests),
    });
    const getSendReq = await sendReq.json();

    if(!sendReq.ok) {
      const error = Error(getSendReq.message || "failed to fetch request");
      throw error;
    }

    context.commit('addRequests', newRequests);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const getReq = await fetch(`${ FIREBASE_LINK }/requests/${ coachId }.json?auth=${ token }`);
    const getAllReq = await getReq.json();

    if(!getReq.ok) {
      const error = Error(getAllReq.message || "failed to fetch request");
      throw error;
    }

    const requests = [];

    for(const key in getAllReq) {
      const request = {
        id: getAllReq[ key ].id,
        userEmail: getAllReq[ key ].userEmail,
        userMessage: getAllReq[ key ].userMessage,
        isOpen: getAllReq[ key ].isOpen,
      };

      requests.unshift(request);
    }

    context.commit("setRequests", requests);
  },
  async delete(context, taskId) {
    const coachId = context.rootGetters.userId;
    const deleteReq = await fetch(`${ FIREBASE_LINK }/requests/${ coachId }/request-${ taskId }.json`, {
      method: "DELETE",
    });

    if(!deleteReq.ok) {
      const error = Error("Faild to delete Request");
      throw error;
    }

    context.commit("deleteRequest", taskId);
  },
  async deleteaAll(context) {
    const coachId = context.rootGetters.userId;
    const deleteAllReq = await fetch(`${ FIREBASE_LINK }/requests/${ coachId }.json`, {
      method: "DELETE",
    });

    if(!deleteAllReq.ok) {
      const error = Error("Faild to delete All Requests");
      throw error;
    }

    context.commit("deleteAllReqs", []);
  },
  async changeStateIsOpen(context, { id, isOpen }) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const updateValue = {
      isOpen: isOpen,
    };

    const requpdate = await fetch(`${ FIREBASE_LINK }/requests/${ coachId }/request-${ id }.json?auth=${ token }`, {
      method: 'PATCH',
      body: JSON.stringify(updateValue),
    });

    if(!requpdate.ok) {
      // error
    }

    context.commit("setIsOpen", { id, isOpen });
  }
};
