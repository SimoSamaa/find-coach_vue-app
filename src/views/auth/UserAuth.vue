<template>
  <section>
    <base-dialog title="Authenticating..." :showDialog="isLoding" loading>
      <BaseLoading />
    </base-dialog>
    <base-dialog title="An error occurred" :showDialog="!!error" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card style="padding: 0;">
      <main>
        <form @submit.prevent="submitAuth">
          <div class="auth-text">
            <h1>Agent Login</h1>
            <p>Hey, Enter your details to get signup to your account</p>
          </div>
          <BaseInputfield
            text="Email"
            maxlength="35"
            @two-way="Email"
            :err="{error: !email.isValid}"
          />
          <div class="pass-container">
            <BaseInputfield
              class="input-pass"
              text="Password"
              type="password"
              maxlength="15"
              @two-way="Pass"
              :err="{error: !password.isValid}"
            />
            <svg
              @click="passControl"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

              <path
                v-if="!passAct"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </div>
          <p
            v-if="!authValid"
            style="font-size: 12px;"
          >Please enter a valid email and password (must be at 8 characters long).</p>
          <div class="actions">
            <base-button type="submit">{{ submitBtn }}</base-button>
            <base-button type="button" mode="outline" @click="switchMode">{{ switchModeBtn }}</base-button>
          </div>
          <small class="copy-right">Copyright &copy;CoachFind {{ currentYear }} | Privacy Policy</small>
        </form>
        <div class="main-auth__img"></div>
      </main>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      passAct: false,
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      patternGmail: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      authValid: true,
      authMode: "login",
      isLoding: false,
      error: null,
    };
  },
  computed: {
    submitBtn() {
      if (this.authMode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeBtn() {
      if (this.authMode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
    currentYear() {
      return new Date().getFullYear();
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    contact() {
      const redirectUrl1 =
        "/" + (this.isLoggedIn ? this.$route.query.redCont : "coaches");
      return redirectUrl1;
    },
    reg() {
      const redirectUrl2 =
        "/" + (this.isCoach ? "coaches" : this.$route.query.redReg);
      return redirectUrl2;
    },
  },
  methods: {
    switchMode() {
      this.authMode === "login"
        ? (this.authMode = "signup")
        : (this.authMode = "login");
    },
    Email(val) {
      this.email.value = val;
      if (this.email.value.match(this.patternGmail)) this.email.isValid = true;
    },
    Pass(val) {
      this.password.value = val;
      if (this.password.value.length === 8) this.password.isValid = true;
    },
    passControl() {
      const thePass = document.querySelector(".input-pass input");
      thePass.type === "password"
        ? (thePass.type = "text")
        : (thePass.type = "password");

      this.passAct = !this.passAct;
    },
    checksubmitAuth() {
      this.authValid = true;

      if (
        this.email.value === "" ||
        !this.email.value.match(this.patternGmail)
      ) {
        this.email.isValid = false;
        this.authValid = false;
      }

      if (this.password.value === "" || this.password.value.length < 8) {
        this.password.isValid = false;
        this.authValid = false;
      }
    },
    async submitAuth() {
      this.checksubmitAuth();

      switch (!this.authValid) {
        case !this.email.isValid:
        case !this.password.isValid:
          if (!this.authValid) return;
      }

      const authData = {
        email: this.email.value,
        password: this.password.value,
      };

      this.isLoding = true;

      try {
        if (this.authMode === "login") {
          await this.$store.dispatch("login", authData);
        } else {
          await this.$store.dispatch("signup", authData);
        }

        const redirectUrl2 =
          "/" +
          (this.isCoach ? "coaches" : this.$route.query.redReg || "coaches");

        this.$router.replace(redirectUrl2);
      } catch (err) {
        this.error = err || "Failed to authenticate";
      }
      this.isLoding = false;
    },
    dialogClose() {
      this.error = null;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixin";
main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @include breakPoint(medium-screen) {
    display: block;
  }
  .auth-text {
    text-align: center;
  }

  form {
    & > *:not(p) {
      margin-top: 2rem;
    }

    padding: 1em;
    .pass-container {
      position: relative;

      svg {
        @include positionOptions(absolute, 50% 1rem auto auto, 0, -50%);
        cursor: pointer;
      }
    }

    small {
      text-align: center;
      border-top: 1px solid var(--clr-accent);
      padding-top: 1em;
      display: block;
      margin-top: 20px;
    }
  }
  .main-auth__img {
    background: url("../../assets/img/main-auth_img.jpg") no-repeat center /
      cover;
  }
}
</style>