<template>
  <header id="app-navigation">
    <!-- user-img-profile -->
    <BaseSkeletonLoading v-if="isLoading" height="40px" width="40px" borderRadius="50%" />
    <div v-else-if="isCoach" @click="mainUserProfile" class="profile-coach">
      <img :src="userImg" alt="img-profile" />
    </div>
    <!-- logo -->
    <router-link v-else to="/coaches" class="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 1000 1000"
        enable-background="new 0 0 1000 1000"
        xml:space="preserve"
        id="logo-svg"
      >
        <g>
          <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
            <path
              d="M2343.2,4142.5c-416.4-91.5-772.5-385.3-988.5-815.4c-77.8-155.7-105.1-247.1-142.1-467c-13.6-85.6-48.7-229.6-75.9-321.1c-68.1-223.8-103.1-453.4-126.5-846.5c-9.7-181-19.5-346.4-19.5-363.9c0-19.5-33.1-48.6-85.6-70c-149.8-68.1-216-190.7-237.4-457.3c-29.2-367.8,109-640.2,350.3-688.9c74-15.6,75.9-15.6,126.5-190.7c161.5-537.1,457.3-969.1,817.3-1196.8l138.2-87.6l-5.8-253l-3.9-253l-825.1-196.5c-453.4-109-844.5-208.2-869.8-217.9c-81.7-38.9-208.2-167.3-245.2-253c-110.9-247.1-35-690.8,200.4-1185.1l95.4-200.4h2763.2h2761.3l33.1,60.3c33.1,66.2,17.5,95.4-56.4,95.4c-17.5,0-132.3,31.1-253,70c-1083.9,348.3-1872,1227.9-2119.2,2362.4c-37,177.1-42.8,260.8-42.8,622.7c0,358.1,5.8,445.6,42.8,613c140.1,649.9,404.8,1134.5,867.9,1595.7c272.4,270.5,432,391.1,737.5,554.6l190.7,101.2l-13.6,72c-5.8,38.9-23.3,118.7-37,177.1s-31.2,163.5-38.9,233.5c-50.6,484.5-210.2,875.7-412.5,1009.9c-118.7,79.8-227.7,93.4-391.1,50.6l-130.4-33.1l-210.2,107c-276.3,142.1-574.1,258.8-850.4,328.9C3006.8,4173.6,2568.9,4193.1,2343.2,4142.5z"
            />
            <path
              d="M6274,1817.1c-554.6-81.7-1074.2-354.2-1475-776.4c-350.3-365.8-579.9-819.2-665.5-1311.6c-38.9-223.8-38.9-655.8,0-879.6c159.6-910.7,827-1687.1,1704.6-1981c280.2-93.4,451.5-118.7,805.6-118.7c202.4,0,383.4,9.7,467,27.3c194.6,38.9,505.9,142,665.5,221.8l136.2,70.1l455.3-457.3c544.9-544.9,570.2-562.4,854.3-562.4c147.9,0,202.4,7.8,274.4,40.9c264.7,122.6,426.2,400.9,400.9,685c-23.4,235.5-66.2,295.8-566.3,799.8l-453.4,459.2l73.9,155.7c171.3,362,237.4,663.6,239.4,1099.5c1.9,266.6-5.9,356.1-44.8,525.4c-107,486.5-334.7,912.6-673.3,1257.1c-379.5,387.2-877.6,646-1408.9,735.6C6865.6,1840.5,6470.6,1846.3,6274,1817.1z M6941.5,717.6C7653.7,571.7,8151.9-70.5,8107.1-788.5c-15.6-227.7-52.5-371.7-149.8-574.1c-142.1-293.8-381.4-527.3-690.8-673.3c-229.6-107-414.5-142.1-688.9-130.4c-393.1,17.5-685,147.9-965.2,432c-181,184.9-262.7,315.3-348.3,550.7c-58.4,163.5-60.3,182.9-60.3,472.9c0,280.2,3.9,313.3,54.5,457.3c79.8,227.7,194.6,408.6,361.9,574.1C5982.1,674.8,6457,816.9,6941.5,717.6z"
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
            <small v-if="recivedRequests >= 1" class="notification">{{ recivedRequests }}</small>
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
      return this.$store.getters["requests/requestsLen"];
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
    async loadDataHeader(re = false) {
      this.isLoading = true;
      try {
        if (this.isLoggedIn) {
          await this.$store.dispatch("requests/fetchRequests");
          await this.$store.dispatch("coaches/loadCoachData", { r: re });
          this.theSelectedCoach = this.$store.getters["coaches/coaches"].find(
            (coach) => coach.id == this.userId
          );
          // console.log(this.theSelectedCoach.id);
          // console.log(this.userId);
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.loadDataHeader();
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
