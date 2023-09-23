<template>
  <section v-show="dataFilter">
    <svg
      @click="$emit('close-filter', dataFilter)"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      id="close-filter"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <div class="developer-filter expe-filter border-style">
      <h3>
        Developer
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
            d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
          />
        </svg>
      </h3>
      <div class="checkbox-container">
        <BaseCheckbox class="checkbox" text="frontend" id="frontend" checked @change="setFilters" />
        <BaseCheckbox class="checkbox" text="backend" id="backend" checked @change="setFilters" />
      </div>
    </div>
    <div class="design-filter expe-filter border-style">
      <h3>
        Design
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
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      </h3>
      <BaseCheckbox class="checkbox" text="ui/ux" id="uiux" checked @change="setFilters" />
    </div>
  </section>
</template>

<script>
export default {
  emits: ["change-filter", "close-filter"],
  props: ["dataFilter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        uiux: true,
      },
    };
  },
  methods: {
    setFilters(e) {
      const inputId = e.target.id;
      const isChecked = e.target.checked;

      const filterUpdate = {
        ...this.filters,
        [inputId]: isChecked,
      };

      this.filters = filterUpdate;
      this.$emit("change-filter", filterUpdate);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
section {
  @include positionOptions(fixed, 50% auto auto 50%, -50%, -50%);
  width: min(500px, 100%);
  min-height: fit-content;
  border-radius: 1rem;
  padding: 3.5em 1.5em 1.5em;
  background: var(--clr-base-card);
  z-index: 1000;

  @mixin checkFilterAnimation($typeAnimation) {
    .filterAnima-enter-active {
      animation: filterAnima 300ms ease-out forwards;
    }

    .filterAnima-leave-active {
      animation: filterAnima 300ms ease-in reverse forwards;
    }

    @keyframes filterAnima {
      from {
        opacity: 0;
        @if ($typeAnimation == "mobile") {
          bottom: -90svh;
        }

        @if ($typeAnimation == "laptop") {
          transform: translate(-50%, -30px);
        }
      }

      to {
        opacity: 1;
        @if ($typeAnimation == "mobile") {
          bottom: 0;
        }

        @if ($typeAnimation == "laptop") {
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  @include checkFilterAnimation(laptop);

  @include breakPoint(small-screen) {
    @include positionOptions(fixed, auto auto 0 50%, -50%, 0);
    height: 90svh;
    border-radius: 1rem 1rem 0 0;

    @include checkFilterAnimation(mobile);
  }

  #close-filter {
    @include positionOptions(absolute, 1rem 1.5rem auto auto, null, null);
    cursor: pointer;
  }
  .expe-filter {
    border-radius: 0.3rem;

    & + .expe-filter {
      margin-top: 1rem;
    }

    h3 {
      @include flexOptions(flex, null, center, 0.2rem);
      margin-bottom: 0.5rem;
    }

    .checkbox-container {
      @include flexOptions(flex, null, null, 1rem);
      flex-wrap: wrap;
    }

    .checkbox {
      margin-left: 1.5rem;
    }
  }
}
</style>