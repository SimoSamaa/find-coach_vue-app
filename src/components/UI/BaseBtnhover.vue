<template>
  <span class="context-hover border-style">
    <strong>{{ hoverText }}</strong>
  </span>
</template>

<script>
export default {
  props: {
    hoverText: {
      type: String,
      required: false,
      default: "",
    },
    leftDir: {
      type: String,
      required: false,
      default: "50%",
    },
    translateX: {
      type: String,
      required: false,
      default: "-50%",
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
$classesHoverBtn: ("search-btn", "filter-btn", "email-contact");

@each $hoverClass in $classesHoverBtn {
  .#{$hoverClass} {
    .context-hover {
      @include positionOptions(
        absolute,
        -2.5rem auto auto v-bind(leftDir),
        v-bind(translateX),
        0
      );
      cursor: none;
      padding: 0.4rem 0.8rem;
      border-radius: 0.3rem;
      font-size: 13px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms ease-out;
      background-color: var(--clr-background);

      @include breakPoint(medium-screen) {
        display: none;
      }
    }
    &:hover .context-hover:not(:hover) {
      opacity: 1;
    }
  }
}
</style>