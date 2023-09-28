<template>
  <li class="border-style">
    <div class="coach-email">
      <a :href="emailLink" class="email-contact">
        <BaseBtnhover leftDir="0" translateX="0" :hoverText="email" />
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
            d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
          />
        </svg>
        <p>{{ email }}</p>
      </a>
      <div class="controles-req">
        <button id="btn" class="btn-action" @click="handleMessage">
          <span>{{ !showMessage ? 'open' : 'close' }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            style="display: block !important;"
          >
            <!-- close message -->
            <path
              v-if="!showMessage"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
            <!-- open-message -->
            <path
              v-else
              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
            />
          </svg>
        </button>
        <button id="btn" class="btn-delete" @click="$emit('delete-req', id, $event)">
          <span>Delete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            style="display: block !important;"
          >
            <path
              stroke-linecap="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="message-container" :class="{'drop-mess':showMessage }">
      <p>
        {{ message }}
        <span class="req-date">{{ reqSendingTiming }}</span>
      </p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "email", "message"],
  emits: ["delete-req"],
  data() {
    return {
      showMessage: false,
    };
  },
  computed: {
    recivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    emailLink() {
      return `mailto:${this.email}`;
    },
    reqSendingTiming() {
      const timing = new Date(this.id);
      const date = `${timing.getFullYear()}/${timing.getMonth() + 1}/${
        timing.getDate() <= 10 ? 0 + timing.getDate() : timing.getDate()
      }/${
        timing.getHours() <= 10 ? 0 + timing.getHours() : timing.getHours()
      }:${
        timing.getMinutes() < 10 ? 0 + timing.getMinutes() : timing.getMinutes()
      }`;
      return date;
    },
  },
  methods: {
    handleMessage() {
      this.showMessage = !this.showMessage;
      // const theOpenMessage = this.recivedRequests.find(
      //   (mess) => mess.id === this.id
      // );
      // console.log(theOpenMessage - this.recivedRequests.length);
      this.$store.commit("requests/requestsNotification");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixin";

li {
  margin-top: 1rem;

  .coach-email {
    @include flexOptions(flex, space-between, center, 0.5rem);

    :is(a, button) {
      @include flexOptions(flex, null, center, 0.4rem);
      padding: 0.5em;
      border-radius: 0.3rem;
      font-weight: bold;
    }

    a {
      color: #4682b4;
      background-color: #add8e6;
      width: min(150px, 40%);
      position: relative;

      p {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .controles-req {
      @include flexOptions(flex, null, null, 0.4rem);
    }
  }
  .message-container {
    display: grid;
    grid-template-rows: 0fr;
    padding-inline: 1em;
    transition: all 300ms ease-out;

    &.drop-mess {
      grid-template-rows: 1fr;
      padding-top: 1em;
    }

    p {
      overflow: hidden;

      .req-date {
        font-size: 10px;
        margin-left: auto;
        width: fit-content;
        display: block;
      }
    }
  }
}
</style>