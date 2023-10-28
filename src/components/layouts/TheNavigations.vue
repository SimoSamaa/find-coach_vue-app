<template>
  <header id="app-navigation">
    <!-- user-img-profile -->
    <BaseSkeletonLoading v-if="isLoading" height="40px" width="40px" borderRadius="50%" />
    <div v-else-if="isCoach" @click="mainUserProfile" class="profile-coach">
      <img :src="userImg" alt="user-img" />
    </div>
    <!-- logo -->
    <router-link v-else to="/coaches" class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.56 247" id="logo-svg">
        <g>
          <g>
            <path d="M111.53,210c.06.2.14.39.21.59h0Z" />
            <path
              d="M238.35,83.68C232.29,67.76,210.88,59.89,196,68.09c-16.06,8.83-31.92,18-47.66,27.38-10.25,6.1-14.21,17.18-9.25,26.09,8.92,16,18.29,31.75,27.48,47.61,1.3,2.25,2.92,2.47,4.93.88,2.34-1.85,4.69-3.72,7.13-5.44s2.82-3.58,1.21-6.32c-8.15-13.87-16.06-27.88-24.22-41.73-2-3.44-.85-5.17,2.1-6.88,12.72-7.39,25.36-14.91,38.1-22.25,3.45-2,7-4.13,10.75-5.14,9.36-2.5,18.32,5.65,17.89,16.3-.64,16.69-4.47,32.63-12.79,47.26q-17.15,30.22-47.42,44.1a45.51,45.51,0,0,0-87.93-.39A100.84,100.84,0,0,1,45.23,167a101.34,101.34,0,0,1-21.82-35c-4.24-11.57-6.69-23.55-6.11-36A14.11,14.11,0,0,1,19,89.67c5.09-8.5,13.19-9.94,22.55-4.44q21,12.31,42,24.47c3.81,2.2,4.1,3.27,1.9,7.08q-11.94,20.73-23.83,41.51c-1.33,2.34-1.38,4.47,1.1,6.22,2.23,1.57,4.31,3.39,6.58,4.92,3.73,2.53,4.44,2.2,6.71-1.82,8.29-14.64,16.55-29.31,25-43.83,5.87-10,3.8-20.86-6.16-27-12.85-7.89-26-15.32-39-22.89-6.12-3.55-12-7.42-19.35-8.55C19,62.64,1.57,74.93.23,93.69c-1.3,18.12,3.07,35.52,10.43,52a116.41,116.41,0,0,0,25.08,36,119,119,0,0,0,39.38,25.9,45.5,45.5,0,0,0,90.08.62,106.57,106.57,0,0,0,26.2-14.41c31-23.18,47.73-54.23,50.16-96.09C240.94,94.94,240.38,89,238.35,83.68ZM137.23,224c-.62.44-2.43-.06-3.18-.72a61.11,61.11,0,0,1-4.88-5.36c-14.33,6.93-26.11-1.41-29.62-10.38A21,21,0,0,1,99,193.87a20.69,20.69,0,0,1,6.46-9.94A20.44,20.44,0,0,1,130,182.46a21,21,0,0,1,4.4,3.78c4.5,5.12,6.45,12.31,4.06,18.83-1.73,4.72-.42,7.28,2.7,10.06a27.18,27.18,0,0,1,2.57,3.1A81.33,81.33,0,0,1,137.23,224Z"
            />
            <path
              d="M180,0a29.7,29.7,0,0,0-28.92,30.13,29.22,29.22,0,0,0,30,28.82c17-.27,29.26-13.22,29-30.46C209.86,12.64,196.24-.27,180,0Zm.4,43.75a14.18,14.18,0,0,1-13.9-14.12c.07-7.66,6.53-14.3,13.88-14.26a14.34,14.34,0,0,1,14.45,14.81C194.8,37.64,188.28,43.78,180.44,43.75Z"
            />
            <path
              d="M61,.09A29.32,29.32,0,0,0,31,28.3C30.31,45.57,44.17,59.21,59.94,59A29,29,0,0,0,90,30.27C90.4,13.68,77.74.24,61,.09Zm-.43,43.67A14.38,14.38,0,0,1,46.3,29.1c.12-7,7.31-14,14.21-13.78A14.34,14.34,0,0,1,74.62,29.78C74.43,37.8,68.26,44,60.61,43.76Z"
            />
            <path d="M111.74,210.61h0c-.07-.2-.15-.39-.21-.59Z" />
            <path d="M111.74,210.61h0c-.07-.2-.15-.39-.21-.59Z" />
            <path
              d="M131.59,200a12.7,12.7,0,0,1-1.73,6.15,13,13,0,0,1-10.79,6.6,12.75,12.75,0,0,1-7.33-2.13l-.21-.59c.06.2.14.39.21.59a13,13,0,0,1,6.88-23.74A13.16,13.16,0,0,1,131.59,200Z"
            />
          </g>
        </g>
      </svg>
    </router-link>
    <BaseHamburgerMenu @active-menu="openNav" class="hamburger-menu" />
    <transition name="nav" mode="out-in">
      <nav v-if="isOpen" @click.stop>
        <ul>
          <!-- all coaches -->
          <li>
            <router-link to="/coaches">all coaches</router-link>
          </li>
          <!-- requests -->
          <li v-if="isLoggedIn && isCoach">
            <router-link to="/requests">requests</router-link>
            <small v-if="recivedRequests" class="notification">{{ recivedRequests }}</small>
          </li>
          <!-- login/logout -->
          <li class="auth-link">
            <router-link :to="isLoggedIn ? '/' : '/auth'" @click="logout">
              <span>{{ isLoggedIn ? 'Logout' : 'Login'}}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <!-- login -->
                <path
                  v-if="!isLoggedIn"
                  stroke-linecap="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
                <!-- logout -->
                <path
                  v-else
                  stroke-linecap="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </router-link>
          </li>
        </ul>
        <button class="togglte-mode" @click="toggleTheMode">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#fff"
          >
            <!-- moon -->
            <path
              id="moon"
              stroke-linecap="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
            <!-- sun -->
            <path
              id="sun"
              stroke-linecap="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      </nav>
    </transition>
  </header>
</template>

<script>
import BaseHamburgerMenu from "@/components/UI/BaseHamburgerMenu";

export default {
  emits: ["toggle-mode"],
  components: {
    BaseHamburgerMenu,
  },
  mounted() {
    const mediaQmaxWidth = window.matchMedia("(max-width: 890px)");
    this.handleNaveBarSize(mediaQmaxWidth);
    mediaQmaxWidth.addListener(this.handleNaveBarSize);

    document.addEventListener.call(window, "click", (e) => {
      const matchesMenu = e.target.matches(".hamburger-menu");
      const matchesNav = e.target.matches("nav");

      const stopDocClick = (e) => {
        const darkModeOn = e.matches;
        if (darkModeOn) {
          !matchesMenu && !matchesNav ? (this.isOpen = false) : null;
        } else this.isOpen = true;
      };

      stopDocClick(mediaQmaxWidth);
      mediaQmaxWidth.addListener(stopDocClick);
    });
  },
  data() {
    return {
      theSelectedCoach: null,
      isOpen: false,
      isLoading: false,
      controleFetch: true,
    };
  },
  computed: {
    userImg() {
      return this.theSelectedCoach?.userImg == ""
        ? require("@/assets/icon/user-icon.svg")
        : this.theSelectedCoach?.userImg;
    },
    userId() {
      return this.$store.getters["userId"];
    },
    recivedRequests() {
      return this.$store.getters["requests/messagesNotification"];
    },
    notificationMess() {
      return this.$store.getters["requests/notificationMess"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"]; // false
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    async mainUserProfile() {
      this.$router.replace(`/coaches/${this.userId}`);
    },
    toggleTheMode() {
      this.$emit("toggle-mode");
    },
    openNav() {
      this.isOpen = !this.isOpen;
    },
    handleNaveBarSize(e) {
      const darkModeOn = e.matches;
      darkModeOn ? this.isOpen : (this.isOpen = true);
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
    async upcamingsMess() {
      try {
        if (!this.isLoggedIn) return;
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        console.error(error);
      }
    },
    async loadDataHeader(re = false) {
      this.isLoading = true;

      try {
        if (!this.isLoggedIn) return;
        await this.$store.dispatch("requests/fetchRequests");
        await this.$store.dispatch("coaches/loadCoachData", {
          r: re,
        });
        this.theSelectedCoach = this.$store.getters["coaches/coaches"].find(
          (coach) => coach.id == this.userId
        );
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    notificationSend() {
      if (this.isCoach) {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            const message = new Notification("Receiving Messagec From", {
              body: this.notificationMess,
              icon: require("../../../public/favicon-light.png"),
            });

            message.onclick = () => {
              this.$router.replace("./requests");
            };
          }
        });
      }
    },
  },
  async created() {
    setInterval(() => {
      if (!this.isLoggedIn) return;
      if (this.controleFetch) {
        this.loadDataHeader();
        this.controleFetch = false;
      }
    }, 100);

    setInterval(() => this.upcamingsMess(), 10000);
  },
  watch: {
    recivedRequests(newVal, oldVal) {
      if (newVal > oldVal) {
        this.notificationSend();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixin";

header {
  padding: 1em;
  @include flexOptions(flex, space-between, center, null);
  @include positionOptions(fixed, 1em auto auto 50%, -50%, 0);
  width: min(800px, 90%);
  border-radius: 4rem;
  text-transform: capitalize;
  background-color: var(--clr-base-card);
  transition: 300ms ease-out;
  box-shadow: 0 2px 6px rgb(0 0 0 / 19%);
  z-index: 122;
  .profile-coach {
    width: 40px;
    height: 40px;
    border: 2px solid var(--clr-accent);
    background-color: var(--clr-accent);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .logo {
    width: 40px;
    height: 40px;

    #logo-svg {
      fill: var(--clr-accent);
      width: 100%;
    }
  }

  .hamburger-menu {
    display: none;
    @include breakPoint(large-screen) {
      display: block;
      border-radius: 50%;
    }
  }

  nav {
    @include flexOptions(flex, null, null, 1em);
    @include breakPoint(large-screen) {
      @include positionOptions(absolute, 76px 0 auto auto, null, null);
      flex-direction: column-reverse;
      padding: 1em;
      border-radius: 0.5rem;
      background-color: var(--clr-base-card);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      .togglte-mode {
        margin-left: auto;
      }
    }
    .router-link-active {
      background-color: var(--clr-accent);
    }

    ul {
      @include flexOptions(flex, null, center, 2em);

      li {
        font-weight: bold;
        letter-spacing: 1px;
        width: 120px;
        height: 40px;
        position: relative;

        a {
          display: block;
          height: 100%;
          border-radius: 3em;
          @include gridOptions(grid, center, null);
          border: 2px solid var(--clr-accent);
          transition: 500ms ease-out;
        }

        a:hover {
          background-color: var(--clr-accent);
        }
        .notification {
          @include positionOptions(absolute, -5px -5px auto auto, null, null);
          background-color: var(--clr-error);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          text-align: center;
          color: #fff;
        }

        &:hover a {
          color: #e2e4e9;
        }
      }
      .auth-link {
        & a {
          @include flexOptions(flex, center, null, null);
          background: var(--clr-background);
          color: var(--clr-accent);
          border-radius: 0.3rem;
          &:hover {
            color: var(--clr-text);
          }
        }

        @include breakPoint(large-screen) {
          width: 40px;

          a span {
            display: none;
          }
        }
      }
    }
    .togglte-mode {
      width: 40px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      position: relative;

      & > * {
        @include positionOptions(absolute, 50% auto auto 50%, -50%, -50%);
        width: 30px;
      }
    }
  }

  @include theAnimation(nav, -50px, 0.9);
}
</style>
