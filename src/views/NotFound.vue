<template>
  <section>
    <div>
      <h2>Page Not Found :(</h2>
      <p>We couldn't find the page you are looking for.</p>
      <base-button class="btn-home" @click="$router.replace('/coaches')">Back To Home</base-button>
      <div class="404-img">
        <img src="../assets/img/404-c6f3c581.png" alt="404" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";

section {
  @include positionOptions(fixed, 0, null, null);
  @include gridOptions(grid, center, null);
  width: 100%;
  overflow-y: scroll;
  text-align: center;

  .btn-home {
    margin-block: 1rem;
  }

  img {
    width: 200px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.26));
    pointer-events: none;
  }
}
</style>