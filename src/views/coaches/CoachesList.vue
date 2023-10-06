<template>
  <main>
    <base-dialog title="An error occured!" :showDialog="!!error" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Find You Coach</h2>
        <div class="search-methods">
          <div class="search-containear" :class="{'open-search':openSearch }">
            <button class="search-btn btn-style-1" @click="searchBtn">
              <BaseBtnhover :hoverText="!openSearch ? 'Search' : 'Back'" />
              <svg
                v-if="!openSearch"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                id="search-icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </button>
            <div class="input-search">
              <input
                type="text"
                id="search"
                v-model="search"
                maxlength="35"
                autocomplete="off"
                placeholder="Search"
              />
              <label for="search">Search</label>
              <svg
                v-if="search != ''"
                @click="search = ''"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="empty-input_icon"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <button v-if="!openSearch" class="filter-btn btn-style-1" @click="openFilter = true">
            <BaseBtnhover hoverText="Filter" />
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
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
          <!-- start__filter-coaches -->
          <transition name="backdrop">
            <div class="backdrop" v-if="openFilter" @click="openFilter = false"></div>
          </transition>
          <transition name="filterAnima">
            <filterCoaches
              :data-filter="openFilter"
              @close-filter="openFilter = false"
              @change-filter="setFilter"
              class="filter-coaches"
            />
          </transition>
        </div>
        <!-- end -->
      </base-card>
    </section>
    <section>
      <base-card class="base-card">
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            <span class="zaba">Refresh</span>
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
          <base-button link to="/auth?redReg=register" v-if="!isLoggedIn">
            <span>Login to Register as Coach</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </base-button>
          <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading">
            <span>Register as Coach</span>
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
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>
          </base-button>
        </div>
        <!-- start__placeholder-loading -->
        <ul v-if="isLoading">
          <li class="coach-card border-style" v-for="loadingNum in 2" :key="loadingNum.id">
            <div class="user-info">
              <div class="user-name-img" style="flex: 1;">
                <BaseSkeletonLoading width="45px" height="45px" borderRadius="50%" />
                <BaseSkeletonLoading width="35%" margin="0" />
              </div>
              <BaseSkeletonLoading width="60px" />
            </div>
            <br />
            <p class="description">
              <BaseSkeletonLoading width="65%" />
              <BaseSkeletonLoading style="display: none;" width="30%" />
            </p>
            <div class="expe-placeholder-loading">
              <BaseSkeletonLoading width="88px" height="29px" borderRadius="1rem" />
              <BaseSkeletonLoading width="88px" height="29px" margin="0" borderRadius="1rem" />
              <BaseSkeletonLoading width="88px" height="29px" margin="0" borderRadius="1rem" />
            </div>
            <div class="actions actions_placeholder-loading">
              <BaseSkeletonLoading
                width="105px"
                height="47px"
                borderRadius="2rem"
                v-if="isLoggedIn && !isCoach"
              />
              <BaseSkeletonLoading width="89px" height="47px" margin="0" borderRadius="2rem" />
            </div>
          </li>
        </ul>
        <!-- end -->
        <ul v-else-if="hasCoaches">
          <coach-items
            v-for="coach in usersearch"
            :key="coach.id"
            :id="coach.id"
            :user-img="coach.userImg"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :description="coach.description"
            :hourly-rate="coach.hourlyRate"
          ></coach-items>
        </ul>

        <h3 class="empty" v-else>No coaches found for Now</h3>
        <h3 class="empty" v-if="!checkusersearch && hasCoaches">Oops!! user not found</h3>
      </base-card>
    </section>
  </main>
</template>

<script>
import CoachItems from "@/components/coaches/CoachItems";
import filterCoaches from "@/components/coaches/FilterCoaches";

export default {
  components: {
    CoachItems,
    filterCoaches,
  },
  data() {
    return {
      search: "",
      isLoading: false,
      openSearch: false,
      openFilter: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        uiux: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuth;
    },
    emptyInputSearch() {
      return this.openSearch == false ? this.search : true;
    },
    usersearch() {
      return this.coaches.filter((el) => {
        const fullNameSearch = `${el.firstName} ${el.lastName}`;
        return fullNameSearch.toLowerCase().startsWith(this.search);
      });
    },
    checkusersearch() {
      return this.usersearch.some((el) => {
        const fullNameSearch = `${el.firstName} ${el.lastName}`;
        return fullNameSearch != this.search;
      });
    },
    searchIsVal() {
      return this.search !== "" ? true : false;
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    coaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coache) => {
        if (this.activeFilters.frontend && coache.areas.includes("frontend"))
          return true;

        if (this.activeFilters.backend && coache.areas.includes("backend"))
          return true;

        if (this.activeFilters.uiux && coache.areas.includes("ui-ux"))
          return true;

        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/checkCoaches"];
    },
  },
  methods: {
    setFilter(filterUpdate) {
      this.activeFilters = filterUpdate;
    },
    searchBtn() {
      this.openSearch = !this.openSearch;
      if (!this.openSearch) this.search = "";
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoachData", {
          importRefresh: refresh,
        });
      } catch (err) {
        this.error = err || "Something went worng!!";
      } finally {
        this.isLoading = false;
      }
    },
    dialogClose() {
      this.error = null;
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      const theSearch =
        e.target.matches(".search-btn") ||
        e.target.matches("input") ||
        e.target.matches("label") ||
        e.target.matches(".empty-input_icon") ||
        e.target.matches(".search-containear");

      !theSearch ? (this.openSearch = false) : true;
      if (!this.openSearch) this.search = "";
    });
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.search-methods {
  @include flexOptions(flex, space-between, null, 1rem);
  position: relative;
  margin-top: 0.5rem;
  height: 44px;
  .search-containear {
    @include flexOptions(flex, null, center, null);
    background-color: var(--clr-accent);
    border-radius: 2rem;
    flex: 0;
    transition: 500ms ease-out;

    &.open-search {
      flex: 1;
      background-color: #80808014;
      border: 1px solid var(--clr-accent);

      @include breakPoint(medium-screen) {
        position: absolute;
        width: 100%;
      }
    }

    .search-btn {
      z-index: 100;
      svg {
        pointer-events: none;
      }
    }

    &.open-search .search-btn {
      border-radius: 50% 0 0 50%;
    }

    .input-search {
      flex: 1;
      position: relative;

      input {
        all: unset;
        width: 80%;
      }

      label {
        @include positionOptions(absolute, 50% auto auto -2rem, 0, -50%);
        opacity: 0;
        color: var(--clr-accent);
        cursor: text;
        transition: 300ms 500ms ease-out;
      }

      svg {
        @include positionOptions(absolute, 50% 1rem auto auto, 0, -50%);
        cursor: pointer;
      }
    }
    &.open-search input {
      padding-inline: 1em;
    }
    &.open-search label {
      left: 1rem;
      opacity: 1;
    }

    &.open-search input:focus + label,
    input:not(:placeholder-shown) + label {
      display: none;
    }

    ::placeholder {
      color: transparent;
    }
  }
  .open-search ~ .filter-coaches {
    @include breakPoint(medium-screen) {
      display: none;
    }
  }
}
.base-card {
  min-height: 40vh;
  .controls {
    @include flexOptions(flex, space-between, null, null);
    margin-bottom: 1rem;
  }

  ul {
    @include gridOptions(grid, null, 1rem);
  }
}
.description {
  @include breakPoint(small-screen) {
    :first-child {
      width: 100% !important;
    }

    :last-child {
      display: block !important;
    }
  }
}
</style>