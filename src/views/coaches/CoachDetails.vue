<template>
  <main>
    <base-dialog title="An error occured!" :showDialog="!!error" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card class="user-cover">
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
          <BaseSkeletonLoading width="110px" height="28px" margin="1rem" />
          <BaseSkeletonLoading width="60px" height="24px" margin=".5rem" />
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
          <h3>{{ fullName }}</h3>
          <h4>{{ hourlyRate }}</h4>
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
        <div class="loading" style="margin-block: 1rem 1.5rem;" v-if="isLoading">
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
        <p v-else style="margin-block: 1rem 1.5rem;">{{ description }}</p>
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
    async loadCoachesDtails() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("coaches/loadCoachData");

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

h3 {
  margin-top: 1rem;
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