<template>
  <form @submit.prevent="contactForm" class="border-style" style="margin-top: 1rem;">
    <h1>Inrerested? Reach out now!</h1>
    <br />
    <baseInputfield
      class="base-input-field"
      placeholder="Your E-Mail"
      text="Your E-Mail"
      @two-way="Email"
      maxlength="35"
      :err="{error: !email.isValid}"
    />
    <BaseTextarea
      maxlength="300"
      placeholder="write your message to coach"
      :coun="resetValue || 0"
      @two-way="desc"
      :err="{error: !message.isValid}"
    />

    <p v-if="!formValid">Please complete all required fields.</p>
    <br />
    <base-button class="send-mess" type="submit" id="btn">
      <span>Send Message</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    </base-button>
  </form>
</template>

<script>
export default {
  emits: ["popup-mess"],
  data() {
    return {
      email: {
        value: "",
        isValid: true,
      },
      message: {
        value: "",
        isValid: true,
      },
      patternGmail: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      formValid: true,
      resetValue: null,
    };
  },
  computed: {
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    Email(val) {
      this.email.value = val;
      if (this.email.value.match(this.patternGmail)) this.email.isValid = true;
    },
    desc(e, coun) {
      const message = e.target.value;
      this.message.value = message;
      this.resetValue = coun;
      if (this.message.value.length >= 150) this.message.isValid = true;
    },
    checkInputValidation() {
      this.formValid = true;

      if (
        this.email.value === "" ||
        !this.email.value.match(this.patternGmail)
      ) {
        this.email.isValid = false;
        this.formValid = false;
      }

      if (this.message.value === "" || this.message.value.length < 150) {
        this.message.isValid = false;
        this.formValid = false;
      }
    },
    contactForm() {
      this.checkInputValidation();

      switch (!this.formValid) {
        case !this.email.isValid:
        case !this.message.isValid:
          if (!this.formValid) return;
      }

      this.$emit("popup-mess");

      this.$store.dispatch("requests/sendRequests", {
        coachId: this.$route.params.id,
        id: Date.now(),
        email: this.email.value,
        message: this.message.value,
      });

      this.$router.replace(`/coaches/${this.$route.params.id}`);
    },
  },
};
</script>

<style scoped>
.send-mess {
  margin-left: auto;
  display: block;
}
</style>


