<template>
  <div class="main-input" :class="err">
    <input
      :style="{'backgroundColor':isBlur }"
      class="base-input-field"
      autocomplete="off"
      :maxlength="maxlength"
      ref="userInput"
      @blur="checkBlur"
      @focus="checkfocus"
      :type="type"
      :placeholder="placeholder"
      :id="text"
      :max="max"
      @input="theTwoWay"
    />
    <label id="place-holder" :for="text">{{ text }}</label>
    <div v-if="type == 'number'" class="input-number-controls">
      <button type="button" :disabled="num >= max" @click="increesTheNumber(++num)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="#E2E4E9"
        >
          <path d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <button type="button" @click="increesTheNumber(--num)" :disabled="!num">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="#E2E4E9"
        >
          <path d="M19.5 12h-15" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["two-way", "two-click"],
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
    },
    maxlength: {
      type: String,
      required: false,
      default: "20",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    text: {
      type: String,
      required: false,
      default: "",
    },
    max: {
      type: Number,
      required: false,
      default: 100,
    },
    err: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isBlur: true,
      num: 0,
    };
  },
  methods: {
    checkBlur() {
      if (this.isBlur) this.isBlur = "transparent";
      if (this.$refs.userInput.value == "") this.isBlur = "#80808014";
    },
    checkfocus() {
      this.isBlur = "transparent";
    },
    increesTheNumber(val) {
      this.$refs.userInput.value = val;
      this.$emit("two-click", this.num);
      // console.log(this.num);
      this.checkfocus();
    },
    theTwoWay(e) {
      const val = e.target.value;
      e.target.value = val.split(" ").join("");
      this.num = parseInt(val);
      this.$emit("two-way", val.trim(), this.num, this.$refs.userInput.value);
    },
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.main-input {
  width: auto;
  height: 40px;
  position: relative;

  &::before {
    content: "";
    @include positionOptions(absolute, auto auto 0 50%, -50%, 0);
    height: 3px;
    width: 5%;
    opacity: 0;
    background-color: var(--clr-error);
  }

  input {
    width: 100%;
    height: 100%;
    border-bottom: 3px solid var(--clr-accent);
    transition: 300ms background ease-out;

    &[type="number"] {
      -moz-appearance: textfield;
    }

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: 0;
    }

    &::placeholder {
      color: transparent;
    }
  }

  label {
    @include positionOptions(absolute, 50% auto auto 1em, 0, -50%);
    color: var(--clr-accent);
    font-weight: bold;
    cursor: text;
    transition: 300ms top ease-out;
    letter-spacing: 2px;
    user-select: none;
  }

  .input-number-controls {
    @include positionOptions(absolute, 50% 1rem auto auto, 0, -50%);
    display: flex;

    button {
      display: grid;
      border-radius: 0.3rem;
      transform: scale(0.7);

      &[disabled] {
        cursor: no-drop;
        opacity: 0.5;
      }
    }
  }
}
</style>