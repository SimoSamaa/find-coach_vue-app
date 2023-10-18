const WEB_KEY = 'AIzaSyC25_gQSyeh-fi0xaO17DYDqaLtoWv5IvQ';
const SIGNUP_LINK = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const LOGIN_LINK = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

let timer = null; // clear time

const sendRequest = async (payload, authLink) => {
  const response = await fetch(`${ authLink }${ WEB_KEY }`, {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    }),
  });

  return response;
};

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let URL_MODE = LOGIN_LINK;
    let errMess = "";

    if(mode === 'signup') {
      URL_MODE = SIGNUP_LINK;
      errMess = 'Failed to Authenticate. this user is Already signup';
    } else {
      errMess = 'Failed to Authenticate. Check your login Data';
    }

    const response = await sendRequest(payload, URL_MODE);
    const responseData = await response.json();

    if(!response.ok) {
      const error = new Error(responseData.message || errMess);
      throw error;
    }

    // const expiresIn = 5000;
    const expiresIn = parseInt(responseData.expiresIn) * 1000;
    const expirationDate = Date.now() + expiresIn;

    // store data auth in localStorage
    window.localStorage.setItem('token', responseData.idToken);
    window.localStorage.setItem('userId', responseData.localId);
    window.localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('logout');
      document.querySelector('.auth-link a').click();
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  getLoginData(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = parseInt(tokenExpiration) - Date.now();
    if(expiresIn < 0) return;

    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    if(token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit('setUser', {
      userId: null,
      token: null,
    });
  }
};