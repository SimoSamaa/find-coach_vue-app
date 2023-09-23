<template>
  <transition name="popup" mode="out-in">
    <div v-show="!IsConected" :class="IsConected ? 'conected' : 'not-conected'" class="pop-up">
      <header>
        <div class="signal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <!-- signal -->
            <path
              v-if="IsConected"
              stroke-linecap="round"
              d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
            <!-- no-signal -->
            <path
              v-else
              stroke-linecap="round"
              d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z"
            />
          </svg>
        </div>
        <h3>{{IsConected ? 'Restored Connection' : 'Lost Connection'}}</h3>
      </header>
      <div class="main-text">
        <p>
          {{IsConected ? 'Your device is now successfully connected to the internet.'
          : `Your network is unavailable. We will attempt to reconnect you in ${time}`}}
        </p>
        <button
          id="btn"
          class="btn-action"
          :disabled="IsConected"
          @click="checkConnection"
        >Reconnect Now</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      IsConected: true,
      Interval: null,
      time: 0,
    };
  },
  created() {
    setInterval(() => {
      this.IsConected && this.checkConnection();
    }, 3000);
    // clearInterval(this.Interval);
  },
  methods: {
    async checkConnection() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.IsConected = response.status >= 200 && response.status < 300;
      } catch (error) {
        this.IsConected = false;
      }

      this.time = 10;
      clearInterval(this.Interval);
      this.hndlePopUp();
    },
    hndlePopUp() {
      this.Interval = setInterval(() => {
        this.time--;
        if (this.time === 0) this.checkConnection();
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/helpers/mixin";
.pop-up {
  padding: 1em;
  z-index: 120;
  width: min(400px, 90%);
  background-color: var(--clr-background);
  border-top: 5px solid;
  border-radius: 0.3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  @include positionOptions(fixed, auto auto auto 50%, -50%, 0);
  &.conected {
    border-color: var(--clr-good);
    .signal {
      background-color: var(--clr-good);
    }
  }
  &.not-conected {
    border-color: var(--clr-error);
    .signal {
      background-color: var(--clr-error);
    }
  }

  header {
    @include flexOptions(flex, null, center, 1rem);
    .signal {
      @include gridOptions(grid, center, null);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
    }
  }
  .main-text {
    width: 85%;
    margin-left: auto;

    button {
      margin: 0.5rem 0 0 auto;
      display: block;
      color: #fff !important;
    }

    button[disabled] {
      background-color: gray !important;
      cursor: no-drop;
      pointer-events: painted;

      &:active {
        transform: scale(1);
      }
    }

    @include breakPoint("small-screen") {
      display: none;
    }
  }
}

.popup-enter-active {
  animation: popup 300ms ease-out forwards;
}
.popup-leave-active {
  animation: popup 300ms 2.5s ease-in reverse forwards;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translate(-50%, -50%);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
