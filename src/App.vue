<template>
  <TheNavigation :class="scrollAct" @toggle-mode="changeThemeMode" v-if="showNavigation" />
  <PopupConnectionStatus />
  <router-view v-slot="slotProps">
    <transition name="appPage" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheNavigation from "./components/layouts/TheNavigations";
import PopupConnectionStatus from "./components/PopupConnectionStatus";

export default {
  components: {
    TheNavigation,
    PopupConnectionStatus,
  },
  data() {
    return {
      body: document.body,
      KEY_THEME: "save-theme",
      scrollAct: "",
    };
  },
  created() {
    this.$store.dispatch("getLoginData");
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme:light)"
    );

    this.handleDarkmode(darkModeMediaQuery);
    darkModeMediaQuery.addListener(this.handleDarkmode);

    // this.body.className = localStorage[this.KEY_THEME];

    document.addEventListener.call(window, "scroll", () => {
      scrollY >= 30
        ? (this.scrollAct = "scroll-active")
        : (this.scrollAct = "");
    });

    this.body.className == "undefined"
      ? this.body.classList.remove("undefined")
      : null;
  },
  computed: {
    showNavigation() {
      return this.$route.name !== "NotFound";
    },
  },
  methods: {
    changeThemeMode() {
      if (this.body.classList.toggle("dark")) {
        this.body.classList.add("dark");
        this.body.classList.remove("light");
      } else {
        this.body.classList.add("light");
        this.body.classList.remove("dark");
      }

      localStorage.setItem(this.KEY_THEME, this.body.className);
    },
    handleDarkmode(e) {
      const darkModeOn = e.matches;
      if (darkModeOn) {
        this.body.classList.remove("dark");
        this.body.classList.add("light");
      } else {
        this.body.classList.add("dark");
        this.body.classList.remove("light");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./scss/helpers/mixin";
@include theAnimation(appPage, 30px, 1);
</style>