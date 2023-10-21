<template>
  <button :class="{'act': isUp}" @click="goUp" :style="progressScroll">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="#e2e4e9"
    >
      <path stroke-linecap="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isUp: false,
      progressResult: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.buttonUpScroll);
  },
  computed: {
    progressScroll() {
      return {
        background: `conic-gradient(
          #e2e4e9 ${this.progressResult}deg, 
          var(--clr-accent) 0deg)`,
      };
    },
  },
  methods: {
    buttonUpScroll() {
      scrollY >= 100 ? (this.isUp = true) : (this.isUp = false);

      const appHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;

      this.progressResult = (scrollTop / appHeight) * (100 * 3.6);
    },
    goUp() {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/helpers/mixin";

button {
  --btn-size: 70px;

  @include positionOptions(fixed, auto 2rem 2rem auto, null, null);
  @include gridOptions(grid, center, 0);
  width: var(--btn-size);
  aspect-ratio: 1;
  border-radius: 50%;
  isolation: isolate;
  transform: scale(0);
  transition: transform 300ms ease-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.19);

  &::before {
    content: "";
    position: absolute;
    width: calc(var(--btn-size) - 10px);
    aspect-ratio: 1;
    background-color: var(--clr-accent);
    border-radius: inherit;
    z-index: -1;
  }

  &.act {
    transform: scale(1);
  }

  @include breakPoint("small-screen") {
    --btn-size: 50px;
  }
}
</style>