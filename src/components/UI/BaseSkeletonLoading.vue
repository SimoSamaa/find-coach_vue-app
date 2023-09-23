<template>
  <div class="placeholder"></div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      required: true,
      default: "0",
    },
    height: {
      type: String,
      required: false,
      default: "20px",
    },
    borderRadius: {
      required: false,
      type: String,
      default: "4px",
    },
    margin: {
      type: String,
      required: false,
      default: "0.3rem",
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.placeholder + .placeholder {
  margin-top: v-bind(margin);
}
.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);

  background: #656871;
  background-image: linear-gradient(
    to right,
    #656871 0%,
    #888b94 20%,
    #656871 40%,
    #656871 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;

  background-size: 200% 100%;
  animation: bgPos 2.5s linear infinite;

  opacity: 0.4;

  @keyframes bgPos {
    0% {
      background-position: -300px 0;
    }

    100% {
      background-position: 300px 0;
    }
  }
}
</style>