const FIREBASE_LINK = 'https://test-coaches-find-default-rtdb.europe-west1.firebasedatabase.app';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const coachData = {
      userImg: data.img,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
      linkedin: data.linkedin,
      twitter: data.twitter,
      instagram: data.instagram
    };

    const sendData = await fetch(`${ FIREBASE_LINK }/coaches/${ userId }.json?auth=${ token }`, {
      method: "PUT",
      body: JSON.stringify(coachData)
    });

    if(!sendData.ok) {
      // throw Error();
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoachData(context, payload) {
    if(!payload.importRefresh && !context.getters.importUpdate) return;

    const dataUser = await fetch(`${ FIREBASE_LINK }/coaches.json`);
    const allData = await dataUser.json();

    if(!dataUser.ok) {
      const error = Error("Failed to fetch!");
      throw error;
    }

    const coaches = [];

    for(const key in allData) {
      const coach = {
        id: key,
        userImg: allData[ key ].userImg,
        firstName: allData[ key ].firstName,
        lastName: allData[ key ].lastName,
        areas: allData[ key ].areas,
        description: allData[ key ].description,
        hourlyRate: allData[ key ].hourlyRate,
        linkedin: allData[ key ].linkedin,
        twitter: allData[ key ].twitter,
        instagram: allData[ key ].instagram
      };

      coaches.unshift(coach);
    }

    context.commit("setCoaches", coaches);
    context.commit("setLastTimeFetch");
  },
};
