<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    marginTop: {
      type: String,
      required: false,
      default: "0",
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
section {
  width: min(800px, 90%);
  margin: 2em auto;
  background-color: var(--clr-base-card);
  border-radius: 0.5rem;
  padding: 1em;
  box-shadow: 0 2px 6px rgb(0 0 0 / 19%);
  overflow: hidden;

  @include breakPoint(medium-screen) {
    margin-top: v-bind(marginTop);
  }
}
</style>

