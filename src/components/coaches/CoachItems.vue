<template>
  <li class="coach-card border-style">
    <div class="user-info">
      <div class="user-name-img">
        <img :src="imageUser" alt="user-img" />
        <h3>{{ fullName }}</h3>
      </div>
      <h4>${{ hourlyRate }}/hour</h4>
    </div>
    <p class="short-description">{{ shortDescription }}</p>
    <base-expe v-for="area in areas" :key="area.id" :title="area" :type="area"></base-expe>
    <div class="actions">
      <base-button
        link
        mode="outline"
        :to="coachesContactLink"
        v-if="isLoggedIn && !isCoach"
      >Contatc</base-button>
      <base-button link :to="coachesDetailsLink">Dtails</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "id",
    "userImg",
    "firstName",
    "lastName",
    "areas",
    "description",
    "hourlyRate",
  ],
  data() {
    return {};
  },
  computed: {
    imageUser() {
      return this.userImg == ""
        ? require("@/assets/icon/user-icon.svg")
        : this.userImg;
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachesDetailsLink() {
      return `${this.$route.path}/${this.id}`;
    },
    coachesContactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    shortDescription() {
      return `${this.description.slice(0, 50)}...`;
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
</style>