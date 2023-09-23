<template>
  <teleport to="body">
    <transition name="backdrop">
      <div class="backdrop" v-if="showDialog" @click="tryClose"></div>
    </transition>
    <transition name="dialogPopUp">
      <dialog open v-if="showDialog">
        <header>
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
        </header>

        <section>
          <slot></slot>
        </section>

        <menu v-if="!loading">
          <slot name="actions">
            <base-button @click="tryClose" class="btn-close">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: ["close-dialog"],
  props: {
    title: {
      type: String,
      required: false,
    },
    showDialog: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    tryClose() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
dialog {
  color: inherit;
  @include positionOptions(fixed, 50% auto auto 50%, -50%, -50%);
  background-color: var(--clr-base-card);
  border: none;
  width: min(500px, 90%);
  box-shadow: 0 2px 8px #00000042;
  z-index: 1000;
  border-radius: 1rem;
  overflow: hidden;

  :is(header, section, menu) {
    padding: 1em;
  }

  header {
    background-color: var(--clr-accent);
    color: #ffffff;
  }

  section {
    margin-block: 1rem;
  }

  menu {
    :first-child {
      display: block;
      margin-left: auto;
    }
  }
}

@include theAnimation(dialogPopUp, null, null) {
  transform: translate(-50%, -50%) scale(0.8);
}
</style>