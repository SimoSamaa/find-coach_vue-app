<template>
  <div class="check-box" :class="err">
    <input
      type="checkbox"
      ref="inputChecked"
      :checked="checked"
      :id="id"
      @input="$emit('two-way', $event)"
    />
    <label
      class="error-label"
      tabindex="0"
      :for="id"
      @keydown.enter="handleKeyPress($event)"
    >{{ text }}</label>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: "label",
    },
    checked: {
      type: Boolean,
      required: false,
      default: null,
    },
    id: {
      type: String,
      required: false,
      default: "",
    },
    err: {
      type: Object,
      required: false,
    },
  },
  methods: {
    handleKeyPress(e) {
      if (e.keyCode === 13) this.$refs.inputChecked.click();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";

input {
  display: none;
}

label {
  position: relative;
  cursor: pointer;
  outline: none;

  &::before,
  &::after {
    content: "";
    @include positionOptions(absolute, 50% auto auto -1.5rem, 0, -50%);
    aspect-ratio: 1;
    border-radius: 3px;
  }

  &::before {
    width: 15px;
    border: 1px solid var(--clr-accent);
    background-color: #80808014;
    transition: box-shadow 300ms ease-out;
  }

  &:focus-visible:before {
    box-shadow: 0 0 0 3px var(--clr-base-card), 0px 0px 0 4px var(--clr-accent);
  }

  &::after {
    width: 17px;
    transform: translateY(-50%) scale(0);
    background: url("../../assets//icon/checked-icon.svg") center/contain,
      var(--clr-accent);
    transition: transform 300ms ease-out;
  }
}

input:checked ~ label::after {
  transform: translateY(-50%) scale(1);
}
</style>