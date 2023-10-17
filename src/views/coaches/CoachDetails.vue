<template>
  <main>
    <base-dialog title="An error occured!" :showDialog="!!error" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card class="user-cover">
        <button
          v-if="isLoggedIn && isCoach"
          class="edit-data"
          @click="this.$router.replace('/update')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#fff"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <div class="mess-send_pop-up" :class="{'show': popUp}">
          Message Send to Coach
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="lightgreen"
            width="25px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <!-- start__placeholder-loading -->
        <div class="loading" v-if="isLoading">
          <baseSkeletonLoading width="150px" height="150px" borderRadius="50%" />
          <div class="coach-info">
            <div class="full-name__price">
              <BaseSkeletonLoading width="110px" height="28px" margin="1rem" />
              <BaseSkeletonLoading width="60px" height="24px" margin=".5rem" />
            </div>
            <div class="social-media">
              <BaseSkeletonLoading width="24px" height="24px" margin="0" />
              <BaseSkeletonLoading width="24px" height="24px" margin="0" />
              <BaseSkeletonLoading width="24px" height="24px" margin="0" />
            </div>
          </div>
        </div>
        <!-- end -->
        <div v-else>
          <div class="profile-img">
            <img :src="userImg" alt="img-user" class="main-user-img" @click="openFullImg = true" />
            <transition name="backdrop">
              <div v-if="openFullImg" class="full-user-img_container" @click="openFullImg = false">
                <img :src="userImg" alt="full-img" class="full-user-img" @click.stop />
              </div>
            </transition>
          </div>
          <!-- coach-info -->
          <div class="coach-info">
            <div class="full-name__price">
              <h3>{{ fullName }}</h3>
              <h4>{{ hourlyRate }}</h4>
            </div>
            <div class="social-media">
              <a
                :href="linkedinLink === '' ? '#nolinkedinLink' : linkedinLink"
                :target="linkedinLink === '' ? '' : '_blanck'"
                class="linkedin"
              >
                <BaseBtnhover leftDir="50%" translateX="-50%" hoverText="linkedin" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#0073af">
                  <path
                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  />
                </svg>
              </a>
              <a
                :href="twitterLink === '' ? '#notwitterLink' : twitterLink"
                :target="twitterLink === '' ? '' : '_blanck'"
                class="twitter"
              >
                <BaseBtnhover leftDir="50%" translateX="-50%" hoverText="twitter" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#405c79">
                  <path
                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"
                  />
                </svg>
              </a>
              <a
                :href="instagramLink === '' ? '#noinstagramLink' : instagramLink"
                :target="instagramLink === '' ? '' : '_blanck'"
                class="instagram"
              >
                <BaseBtnhover leftDir="50%" translateX="-50%" hoverText="instagram" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#c35a8f">
                  <path
                    d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <base-button
          v-if="showConatctBtn && !isCoach"
          @click="checkBtnContact = false"
          class="contact-btn"
          link
          :to="!isLoggedIn ? authContactLink : coachContactLink"
        >
          <span>{{ !isLoggedIn ? 'Login to Message' : 'Message' }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </base-button>
        <router-view v-slot="slotProps" @popup-mess="showPopupMess" v-if="!isCoach">
          <transition name="contact" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <h2>Description</h2>
        <!-- start__placeholder-loading -->
        <div class="loading" style="margin-block: 0.5em;" v-if="isLoading">
          <div class="loading-mobile" style="display: none; margin-bottom: .3rem;">
            <baseSkeletonLoading width="100%" />
            <BaseSkeletonLoading width="100%" />
            <BaseSkeletonLoading width="100%" />
          </div>
          <baseSkeletonLoading width="100%" />
          <BaseSkeletonLoading width="100%" />
          <BaseSkeletonLoading width="100%" />
          <BaseSkeletonLoading width="80%" />
        </div>
        <!-- end -->
        <p v-else style="margin-block: 0.5em;">{{ description }}</p>
        <h2>Skills</h2>
        <div class="expe-placeholder-loading" v-if="isLoading">
          <BaseSkeletonLoading width="88px" height="29px" borderRadius="1rem" />
          <BaseSkeletonLoading width="88px" height="29px" margin="0" borderRadius="1rem" />
          <BaseSkeletonLoading width="88px" height="29px" margin="0" borderRadius="1rem" />
        </div>
        <base-expe v-else v-for="area in areas" :key="area.id" :title="area" :type="area"></base-expe>
      </base-card>
    </section>
  </main>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      theSelectedCoach: null,
      checkBtnContact: true,
      openFullImg: false,
      popUp: false,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    showConatctBtn() {
      return this.$route.name != "contactBtn";
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    userImg() {
      return this.theSelectedCoach?.userImg == ""
        ? require("@/assets/icon/user-icon.svg")
        : this.theSelectedCoach?.userImg;
    },
    fullName() {
      return `${this.theSelectedCoach?.firstName} ${this.theSelectedCoach?.lastName}`;
    },
    hourlyRate() {
      return `${this.theSelectedCoach?.hourlyRate}/hour`;
    },
    areas() {
      return this.theSelectedCoach?.areas;
    },
    description() {
      return this.theSelectedCoach?.description;
    },
    linkedinLink() {
      return this.theSelectedCoach?.linkedin;
    },
    twitterLink() {
      return this.theSelectedCoach?.twitter;
    },
    instagramLink() {
      return this.theSelectedCoach?.instagram;
    },
    coachContactLink() {
      return `${this.$route.path}/contact`;
    },
    authContactLink() {
      return `/auth?redCont=${this.$route.path.slice(1)}/contact`;
    },
  },
  methods: {
    showPopupMess() {
      this.popUp = true;
      setTimeout(() => {
        this.popUp = false;
      }, 3000);
    },
    dialogClose() {
      this.error = null;
    },
    async loadCoachesDtails(refresh = true) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("coaches/loadCoachData", {
          importRefresh: refresh,
        });

        this.theSelectedCoach = this.$store.getters["coaches/coaches"].find(
          (coach) => coach.id === this.id
        );
      } catch (err) {
        this.error = err || "Something went worng!!";
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.loadCoachesDtails();
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.user-cover {
  padding-top: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      to left,
      rgba(136, 126, 126, 0.278) 50%,
      rgba(203, 196, 196, 0.364)
    );
    height: 150px;
  }
  .edit-data {
    @include positionOptions(absolute, 1em 1em auto auto, null, null);
    @include gridOptions(grid, center, null);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.19);

    &:focus-visible {
      box-shadow: 0 0 0 3px #3b3c3e, 0px 0px 0 5px var(--clr-accent);
    }
  }
}
.main-user-img {
  width: 150px;
  height: 150px;
  background-color: var(--clr-accent);
  border-radius: 50%;
  display: block;
  isolation: isolate;
  cursor: pointer;
}
.full-user-img_container {
  @include gridOptions(grid, center, null);
  @include positionOptions(fixed, 0, null, null);
  background: rgb(0 0 0 /70%);
  z-index: 1000000;
  .full-user-img {
    border-radius: 0.5rem;
    width: min(300px, 80%);
    aspect-ratio: 1/1;
    background-color: var(--clr-accent);
  }
}
.coach-info {
  @include flexOptions(flex, space-between, center, null);
  margin-top: 1rem;
  .social-media {
    @include flexOptions(flex, null, null, 1rem);
    padding-right: 1em;

    a {
      position: relative;
    }
  }
}
.contact-btn {
  margin-left: auto;
  width: fit-content;
  display: block;
}
.mess-send_pop-up {
  @include positionOptions(fixed, 8.5rem auto auto 50%, -50%, 0);
  @include flexOptions(flex, null, center, 0.4rem);
  background: var(--clr-background);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.19);
  padding: 1em;
  border-bottom: 4px solid var(--clr-good);
  border-radius: 0.4rem 0.4rem 0 0;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 500ms ease-out;
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
.loading-mobile {
  @include breakPoint(medium-screen) {
    display: block !important;
  }
}

@include theAnimation(contact, -50px, 0.9);
</style>