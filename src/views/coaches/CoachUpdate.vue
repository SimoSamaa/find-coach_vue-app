<template>
  <section>
    <base-dialog title="Upload Data..." :showDialog="isLoding" loading>
      <BaseLoading />
    </base-dialog>
    <base-dialog title="An error occurred" :showDialog="!!error" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h3>Update coach</h3>
      <form @submit.prevent="submitUpdateData">
        <div class="upload-img-user">
          <div class="img-user">
            <img :src="userImg || require('@/assets/icon/user-icon.svg')" alt="upload-img" />
          </div>
          <div class="btn-controls">
            <div class="btns">
              <base-button type="button" id="btn" @keydown.enter="handleKeyPress($event)">
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref="inputFile"
                  style="display: none;"
                  id="user-img"
                  @input="uploadImgUser"
                />
                <label class="upload" for="user-img"></label>
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </base-button>

              <base-button mode="outline" @click="resetImgUser" id="btn">
                <span>Reset</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"
                  />
                </svg>
              </base-button>
            </div>
            <p>Allowed JPG, GIF or PNG. Max size of 800K</p>
            <small style="color: var(--clr-error);">{{ errorImgSize}}</small>
          </div>
        </div>
        <div class="inputs coach-info">
          <input
            type="text"
            v-model="firstName.value"
            placeholder="First Name"
            :class="{error: !firstName.isValid}"
            maxlength="20"
            @input="inputBeforeUpload"
          />
          <input
            type="text"
            v-model="lastName.value"
            placeholder="Last Name"
            :class="{error: !lastName.isValid}"
            maxlength="20"
            @input="inputBeforeUpload"
          />
          <input
            type="number"
            v-model="hourlyRate.value"
            placeholder="Hourly Rate"
            max="100"
            :class="{error: !hourlyRate.isValid}"
            @input="inputBeforeUpload"
          />
        </div>
        <BaseTextarea
          placeholder="description"
          maxlength="500"
          :coun="resetValue || description.value.length"
          @two-way="desc"
          :value="description.value"
          :err="{error: !description.isValid}"
          @input="inputBeforeUpload"
        />
        <div class="inputs social-media">
          <input type="text" placeholder="linkedin" v-model="linkedin" @input="inputBeforeUpload" />
          <input type="text" placeholder="instagram" v-model="instagram" @input="inputBeforeUpload" />
          <input type="text" placeholder="twitter" v-model="twitter" @input="inputBeforeUpload" />
        </div>
        <base-button :disabled="disabledBtnUpload" class="update-btn" type="submit" id="btn">
          <span>Update</span>
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </base-button>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userImg: "",
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      hourlyRate: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      linkedin: "",
      instagram: "",
      twitter: "",
      formIsValid: true,
      errorImgSize: "",
      resetValue: null,
      isLoding: false,
      error: null,
      disabledBtnUpload: true,
    };
  },
  created() {
    this.loadeDataCoachUpdate();
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    coaches() {
      return this.$store.getters["coaches/coaches"];
    },
    userId() {
      return this.$store.getters.userId;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    inputBeforeUpload() {
      this.disabledBtnUpload = false;
    },
    resetImgUser() {
      this.inputBeforeUpload();
      (this.userImg = "") || (this.errorImgSize = "");
    },
    desc(e, coun) {
      this.description.value = e.target.value;
      this.resetValue = coun;
    },
    handleKeyPress(e) {
      if (e.keyCode === 13) this.$refs.inputFile.click();
    },
    uploadImgUser(e) {
      this.inputBeforeUpload();
      const inputFile = e.target.files[0];
      const imgSize = inputFile.size / 1024;

      if (imgSize >= 800) {
        this.errorImgSize =
          "Image size is too large. Please select an image smaller.";
        e.target.value = "";
        return;
      } else {
        this.errorImgSize = "";
      }

      const reade = new FileReader();
      reade.onload = () => {
        this.userImg = reade.result;
      };
      reade.readAsDataURL(inputFile);
    },
    dialogClose() {
      this.error = null;
    },
    async loadeDataCoachUpdate(refresh = false) {
      try {
        await this.$store.dispatch("coaches/loadCoachData", {
          importRefresh: refresh,
        });
        const coaches = this.coaches.find((coach) => coach.id === this.userId);
        this.userImg = coaches?.userImg;
        this.firstName.value = coaches?.firstName;
        this.lastName.value = coaches?.lastName;
        this.hourlyRate.value = coaches?.hourlyRate;
        this.description.value = coaches?.description;
        this.linkedin = coaches?.linkedin;
        this.instagram = coaches?.instagram;
        this.twitter = coaches?.twitter;
      } catch (error) {
        console.error("Error loading coach data:", error);
      }
    },
    formValidation() {
      this.formIsValid = true;

      if (this.firstName.value === "" || this.firstName.value.length < 4) {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.value === "" || this.lastName.value.length < 4) {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (!this.hourlyRate.value || this.hourlyRate.value <= 9) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }

      if (
        this.description.value === "" ||
        this.description.value.length < 300
      ) {
        this.description.isValid = false;
        this.formIsValid = false;
      }
    },
    hello() {
      console.log("hello");
    },
    async submitUpdateData() {
      this.hello();
      this.formValidation();

      switch (!this.formIsValid) {
        case !this.firstName.isValid:
        case !this.lastName.isValid:
        case !this.hourlyRate.isValid:
        case !this.description.isValid:
          if (!this.formIsValid) return;
      }

      const firstName =
        this.firstName.value[0].toUpperCase() + this.firstName.value.slice(1);
      const lastName =
        this.lastName.value[0].toUpperCase() + this.lastName.value.slice(1);

      this.isLoding = true;

      try {
        const updateCoach = {
          userImg: this.userImg,
          firstName: firstName,
          lastName: lastName,
          hourlyRate: this.hourlyRate.value,
          description: this.description.value,
          linkedin: this.linkedin,
          instagram: this.instagram,
          twitter: this.twitter,
        };

        await this.$store.dispatch("coaches/updateCoach", updateCoach);

        this.$router.replace(`/coaches/${this.userId}`);
      } catch (error) {
        console.error("Error updating coach", error);
        this.error = "Failed to Update Data!" || error.message;
      } finally {
        this.isLoding = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.inputs {
  @include flexOptions(flex, null, null, 1rem);
  margin-block: 1rem;

  @include breakPoint("medium-screen") {
    flex-direction: column;
  }

  input {
    width: calc(100% / 3);
    height: 40px;
    &:focus {
      outline: 2px solid var(--clr-accent);
    }
    &.error {
      outline: 2px solid var(--clr-error);
    }
    @include breakPoint("medium-screen") {
      width: 100%;
    }
  }
}
.update-btn {
  margin-left: auto;
  display: block;

  &[disabled] {
    cursor: no-drop;
    opacity: 0.5;
  }
}
</style>