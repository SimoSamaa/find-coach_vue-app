<template>
  <main>
    <base-dialog :showDialog="!!error" title="An error occured!" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card class="base-card">
        <div class="header-req">
          <h2>Requeests</h2>
          <button
            id="btn"
            class="btn-delete delet-all"
            v-if="checkRequests"
            @click="deleteAllReq"
          >Delet ALL</button>
        </div>
        <!-- start__placeholder-loading -->
        <ul v-if="isLoading">
          <li
            v-for="reqLoad in reqsLoad"
            :key="reqLoad.id"
            class="border-style"
            style="margin-top: 1em;"
          >
            <div class="coach-email">
              <BaseSkeletonLoading width="166px" height="40px" smallWidth="100px" />
              <div class="controles-req">
                <BaseSkeletonLoading width="96px" height="40px" smallWidth="40px" />
                <BaseSkeletonLoading width="101px" height="40px" margin="0" smallWidth="40px" />
              </div>
            </div>
          </li>
        </ul>
        <!-- end -->
        <ul v-else-if="hasRequests">
          <RequestsItems
            @delete-req="deleteReq"
            v-for="req in recivedRequests"
            :key="req.id"
            :id="req.id"
            :email="req.userEmail"
            :message="req.userMessage"
          />
        </ul>
        <h3 class="empty" v-else>You havent't received any requeests yet!</h3>
      </base-card>
    </section>
  </main>
</template>

<script>
import RequestsItems from "@/components/requests/RequestsItems";
export default {
  components: {
    RequestsItems,
  },
  data() {
    return {
      isLoading: false,
      reqsLoad: 3,
      error: null,
    };
  },
  computed: {
    recivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
    checkRequests() {
      return this.$store.getters["requests/checkRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (err) {
        this.error = err.message || "Faild to Fetch Rrequests!!";
      }
      this.isLoading = false;
    },
    dialogClose() {
      this.error = null;
    },
    async deleteReq(reqId, e) {
      // fast remove from UI
      const deleteBtn = e.target.closest("li");
      deleteBtn.remove();

      try {
        await this.$store.dispatch("requests/delete", reqId);
      } catch (err) {
        this.error = "Faild to Delete Rrequest!!" || err.message;
      }
    },
    async deleteAllReq() {
      try {
        await this.$store.dispatch("requests/deleteaAll");
      } catch (err) {
        this.error = "Faild to Delete All Rrequest!!" || err.message;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";
.base-card {
  min-height: 77vh;

  .header-req {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .coach-email {
    @include flexOptions(flex, space-between, center, 0.5rem);

    :first-child {
      width: 119px;
    }

    & :last-child {
      @include flexOptions(flex, null, null, 0.4rem);

      & > * {
        width: 51px;
        height: 35px;
      }
    }
  }
}
</style>