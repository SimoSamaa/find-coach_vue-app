<template>
  <form @submit.prevent="submitForm">
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

          <base-button mode="outline" @click="userImg = '' " id="btn">
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
      </div>
    </div>
    <br />
    <div class="full-name">
      <BaseInputfield
        placeholder="First Name"
        text="First Name"
        @two-way="first"
        :err="{error: !firstName.isValid}"
      />
      <BaseInputfield
        placeholder="Last Name"
        text="Last Name"
        @two-way="last"
        :err="{error: !lastName.isValid}"
      />
    </div>
    <BaseInputfield
      type="number"
      placeholder="Hourly Rate"
      text="Hourly Rate"
      @two-way="rate"
      @two-click="inputBtn"
      :err="{error: !hourlyRate.isValid}"
    />
    <BaseTextarea
      maxlength="500"
      placeholder="please write a description"
      :coun="resetValue || 0"
      @two-way="desc"
      :err="{error: !description.isValid}"
    />
    <h3>Areas of Expertise</h3>
    <div class="areas-expertise">
      <BaseCheckbox
        text="Frontend Development"
        id="frontend"
        @two-way="area"
        :err="{error: !areas.isValid}"
      />
      <BaseCheckbox
        text="Backend Development"
        id="backend"
        @two-way="area"
        :err="{error: !areas.isValid}"
      />
      <BaseCheckbox text="UI/UX Desing" id="ui-ux" @two-way="area" :err="{error: !areas.isValid}" />
    </div>
    <div style="margin-block: 1rem;">
      <p v-if="!formIsValid">Please complete all required fields.</p>
    </div>
    <div class="btns-actions-form">
      <base-button id="btn" type="submit">
        <span>Register</span>
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
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </base-button>
      <base-button mode="outline" id="btn" type="reset" @click="zaba">
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
  </form>
</template>

<script>
export default {
  emits: ["save-form", "reset-counter"],
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
        value: null,
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      resetValue: null,
      receivingNum: null,
      formIsValid: true,
      regName: /^[A-Za-z]([^0-9]*)$/g,
    };
  },
  methods: {
    zaba() {
      this.resetValue = 0;
    },
    handleKeyPress(e) {
      if (e.keyCode === 13) this.$refs.inputFile.click();
    },
    formValidation() {
      this.formIsValid = true;

      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (
        this.description.value === "" ||
        this.description.value.length < 300
      ) {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.hourlyRate.value || this.hourlyRate.value <= 9) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.formValidation();

      switch (!this.formIsValid) {
        case !this.firstName.isValid:
        case !this.lastName.isValid:
        case !this.hourlyRate.isValid:
        case !this.description.isValid:
        case !this.areas.isValid:
          if (!this.formIsValid) return;
      }

      const formData = {
        img: this.userImg,
        first: this.firstName.value,
        last: this.lastName.value,
        rate: this.hourlyRate.value || this.receivingNum,
        desc: this.description.value,
        areas: this.areas.value,
      };
      // console.log(formData);
      this.$emit("save-form", formData);
    },
    uploadImgUser(e) {
      const inputFile = e.target.files[0];
      const reade = new FileReader();
      reade.onload = () => {
        this.userImg = reade.result;
      };
      reade.readAsDataURL(inputFile);
    },
    first(val) {
      this.firstName.value = val[0]?.toUpperCase() + val.slice(1);
      const firstUpper = val.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

      if (
        this.firstName.value.match(this.regName) &&
        this.firstName.value.match(firstUpper)
      )
        this.firstName.isValid = true;
    },
    last(val) {
      this.lastName.value = val[0]?.toUpperCase() + val.slice(1);
      const firstUpper = val.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
      if (
        this.lastName.value.match(this.regName) &&
        this.lastName.value.match(firstUpper)
      )
        this.lastName.isValid = true;
    },
    rate(val) {
      this.hourlyRate.value = val;
      if (this.hourlyRate.value >= 10) this.hourlyRate.isValid = true;
    },
    desc(e, coun) {
      this.description.value = e.target.value;
      this.resetValue = coun;
      if (this.description.value.length >= 300) this.description.isValid = true;
    },
    area(e) {
      const checkedValue = e.target.id;
      const index = this.areas.value.indexOf(checkedValue);

      e.target.checked
        ? this.areas.value.push(checkedValue)
        : this.areas.value.splice(index, 1);

      if (this.areas.value.length >= 1) this.areas.isValid = true;
    },
    inputBtn(num) {
      this.receivingNum = num;
      this.receivingNum >= 10
        ? (this.hourlyRate.isValid = 1)
        : (this.hourlyRate.isValid = 0);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.upload-img-user {
  margin-top: 1rem;
  padding-bottom: 1em;
  position: relative;
  @include flexOptions(flex, null, center, 1rem);

  &::before {
    content: "";
    @include positionOptions(absolute, auto auto 0 50%, -50%, 0);
    width: 200%;
    border-bottom: 1px solid var(--clr-accent);
  }
  .img-user {
    width: 100px;
    height: 100px;
    background-color: var(--clr-accent);
    border-radius: 0.5rem;
    flex-shrink: 0;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 18%);

    img {
      width: 100%;
      height: 100%;
    }
  }
  .btns {
    margin-bottom: 0.5rem;
    .upload {
      @include positionOptions(absolute, 0, null, null);
      cursor: pointer;
    }
  }
}

.full-name {
  @include gridOptions(grid, null, 1rem);
  margin-bottom: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
}

.areas-expertise {
  padding-left: 1.5em;
  margin-top: 0.5rem;
}
.btns-actions-form {
  width: fit-content;
  margin-left: auto;
}
</style>