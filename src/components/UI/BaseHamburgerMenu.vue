<template>
  <button id="base-h-m" @click.stop="menu">
    <span :class="spanOne"></span>
    <span :class="spanTwo"></span>
    <span :class="spanThree"></span>
  </button>
</template>

<script>
export default {
  emits: ["active-menu"],
  created() {
    document.addEventListener.call(window, "click", (e) => {
      !e.target.matches("#base-h-m") ? (this.isClicked = false) : null;
    });
  },
  data() {
    return {
      isClicked: false,
    };
  },
  computed: {
    spanOne() {
      return [{ one: this.isClicked }, { all: this.isClicked }];
    },
    spanTwo() {
      return [{ two: this.isClicked }, { all: this.isClicked }];
    },
    spanThree() {
      return [{ three: this.isClicked }, { all: this.isClicked }];
    },
  },
  methods: {
    menu() {
      this.$emit("active-menu", this.isClicked);
      this.isClicked = !this.isClicked;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixin";

button {
  position: relative;
  width: 40px;
  aspect-ratio: 1;
  border-radius: 0.2rem;
  background: transparent;

  span {
    @include positionOptions(absolute, 50% auto auto 50%, -50%, -50%);
    background-color: var(--clr-text);
    width: 55%;
    height: 2px;
    border-radius: 1rem;
    transition: 300ms ease-out all;

    &:nth-child(1) {
      top: 30%;
    }

    &:nth-child(3) {
      top: 70%;
    }

    &:nth-child(1).one {
      transform: rotate(45deg);
    }
    &:nth-child(2).two {
      height: 0;
      transform: translateX(-100%);
    }

    &:nth-child(3).three {
      transform: rotate(-45deg);
    }

    &:is(:nth-child(odd).all) {
      inset: 50% auto auto 24%;
    }
  }
}
</style>