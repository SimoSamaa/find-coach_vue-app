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

          <base-button mode="outline" @click="(userImg = '' ) || (errorImgSize = '')" id="btn">
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
    <div class="social-media">
      <p
        tabindex="0"
        role="button"
        @keydown.enter="moreOptionsKeyPress($event)"
        @click="moreOptions = !moreOptions"
      >more options</p>
      <div class="social-media__container" :class="{'drop-options': moreOptions}">
        <div class="social-media__content">
          <h3>Social Media Links</h3>
          <div class="input-links">
            <div class="linkedin-link link">
              <input type="text" placeholder="linkedin" v-model="linkedin" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                />
              </svg>
            </div>
            <div class="twitter-link link">
              <input type="text" placeholder="twitter" v-model="twitter" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"
                />
              </svg>
            </div>
            <div class="instagram-link link">
              <input type="text" placeholder="instagram" v-model="instagram" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      linkedin: "",
      twitter: "",
      instagram: "",
      resetValue: null,
      receivingNum: null,
      formIsValid: true,
      regName: /^[A-Za-z]([^0-9]*)$/g,
      errorImgSize: "",
      moreOptions: false,
    };
  },
  methods: {
    zaba() {
      this.resetValue = 0;
    },
    handleKeyPress(e) {
      if (e.keyCode === 13) this.$refs.inputFile.click();
    },
    moreOptionsKeyPress(e) {
      if (e.keyCode === 13) this.moreOptions = !this.moreOptions;
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

      if (this.linkedin.includes("https://")) {
        this.linkedin = this.linkedin.slice(8);
        this.twitter = this.twitter.slice(8);
        this.instagram = this.instagram.slice(8);
      }

      const formData = {
        img: this.userImg,
        first: this.firstName.value,
        last: this.lastName.value,
        rate: this.hourlyRate.value || this.receivingNum,
        desc: this.description.value,
        areas: this.areas.value,
        // optionale
        linkedin: `https://${this.linkedin}`,
        twitter: `https://${this.twitter}`,
        instagram: `https://${this.instagram}`,
      };
      console.log(formData);
      this.$emit("save-form", formData);
    },
    uploadImgUser(e) {
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
      object-fit: cover;
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
.social-media {
  margin-block: 0.5rem 0.8rem;

  p {
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
      color: var(--clr-accent);
    }
  }

  &__container {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: all 300ms linear;
    &.drop-options {
      margin-top: 0.5rem;
      padding-block: 1em;
      grid-template-rows: 1fr;
      opacity: 1;
      border-block: 1px solid var(--clr-accent);
    }
  }

  &__content {
    overflow: hidden;
    .input-links {
      @include gridOptions(grid, null, 1rem);
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      margin-top: 0.5rem;
      .link {
        border: 2px solid var(--clr-accent);
        position: relative;
        height: 40px;
        border-radius: 0.4rem;

        &::before {
          content: "https://";
          @include positionOptions(absolute, auto auto auto 0, null, null);
          background: var(--clr-accent);
          height: 100%;
          padding-inline: 0.4em;
          line-height: 2.4;
          color: #e2e4e9;
        }

        svg {
          @include positionOptions(absolute, 50% 0.4rem auto auto, 0, -50%);
          fill: var(--clr-accent);
        }
      }

      input {
        background-color: #80808014;
        padding-inline: 4em 2em;
        width: 100%;
        height: 100%;
        border: 0;

        &:focus {
          background-color: transparent;
        }
      }

      $socialMediaLinks: (
        "linkedin-link": #0073af,
        "twitter-link": #405c79,
        "instagram-link": #c35a8f,
      );

      @each $linkClass, $linkColor in $socialMediaLinks {
        .#{$linkClass} input:focus + svg {
          fill: #{$linkColor};
          transition: fill 300ms ease;
        }
      }
    }
  }
}
</style>