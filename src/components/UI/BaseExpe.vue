<template>
  <span class="badge" :class="type">{{ theBadge }}</span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    theBadge() {
      return this.title.toUpperCase();
    },
  },
  mounted() {
    document.querySelectorAll(".ui-ux").forEach((el) => {
      el.textContent = "UI/UX";
    });
  },
};
</script>

<style scoped lang="scss">
.badge:not(:first-child) {
  margin-right: 0.5rem;
}

.badge {
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 2em;
  color: #f0eff0;
  margin-block: 1rem 1.5rem;
  display: inline-block;

  $badgs: ("frontend" steelblue, "backend" slateblue, "ui-ux" slategray);

  @each $type, $bgClr in $badgs {
    &.#{$type} {
      background-color: #{$bgClr};
    }
  }
}
</style>