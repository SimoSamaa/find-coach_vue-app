<template>
  <button v-if="!link" :type="type" :class="mode">
    <slot></slot>
  </button>

  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    type: {
      type: String,
      required: false,
      default: "button",
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";

:is(button, a) {
  padding: 0.75rem 1.5rem;
  display: inline-block;
  background-color: var(--clr-accent);
  border: 2px solid var(--clr-accent);
  color: #e2e4e9;
  border-radius: 30px;
  margin-right: 0.5rem;

  & :last-child {
    display: none;
  }

  @include breakPoint("small-screen") {
    & :first-child {
      display: none;
    }

    & :last-child {
      display: block !important;
    }
  }
}
.outline {
  background-color: transparent;
  border-color: var(--clr-accent);
  color: var(--clr-accent);

  &:is(:hover, :focus-visible) {
    background-color: var(--clr-hover-button);
    border-color: transparent;

    @include breakPoint("small-screen") {
      background-color: transparent;
      border-color: var(--clr-accent);
    }
  }
}
</style>