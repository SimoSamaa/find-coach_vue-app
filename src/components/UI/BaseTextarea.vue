<template>
  <div :class="err" class="main-textarea">
    <textarea
      id="textarea"
      @input="characterCounter"
      ref="input"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :coun="coun"
      :value="value"
    ></textarea>
    <div class="description-counter">{{ counterLength }}</div>
  </div>
</template>

<script>
export default {
  emits: ["two-way"],
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "placeholder",
    },
    maxlength: {
      type: String,
      required: false,
      default: "0",
    },
    coun: {
      type: Number,
      required: false,
      default: 0,
    },
    err: {
      type: Object,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      counter: 0,
    };
  },
  computed: {
    counterLength() {
      return `${this.coun}/${this.maxlength}`;
    },
  },
  methods: {
    characterCounter(e) {
      const inputVal = this.$refs.input.value.length;
      this.counter = inputVal;
      this.$emit("two-way", e, this.counter);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";

.main-textarea {
  position: relative;

  &::before {
    content: "";
    @include positionOptions(absolute, auto auto 25px 50%, -50%, 0);
    height: 3px;
    width: 5%;
    opacity: 0;
    background-color: var(--clr-error);
  }
}

textarea {
  margin-top: 1rem;
  width: 100%;
  height: 150px;
  padding: 1em 1em 0 1em;
  resize: vertical;
  background-color: #80808014;
  border: 0;
  border-radius: 0.1rem 0.1rem 0 0;
  border-bottom: 3px solid var(--clr-accent);

  &::placeholder {
    color: var(--clr-accent);
    font-weight: bold;
    letter-spacing: 2px;
  }
}
.description-counter {
  width: fit-content;
  margin-left: auto;
  font-size: 13px;
}
</style>