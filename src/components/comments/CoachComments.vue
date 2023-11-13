<template>
  <li class="comment">
    <div class="comment__student-info">
      <div class="first-student-letter">{{ commentName[0] }}</div>
      <div class="name_date">
        <h4>{{ commentName }}</h4>
        <small class="comment-date">{{ commDate }}</small>
      </div>
    </div>

    <div class="student-comment">
      <div v-if="comment.length <= 400">{{ comment }}</div>
      <div v-else>
        <div class="comment-inline">{{ comment.slice(0, 400) }}</div>
        <div class="comment-inline" v-if="!showFullText">. . .</div>
        <div class="comment-inline" v-if="showFullText">{{comment.slice(400) }}</div>
        <small
          @click="showFullComment()"
          class="show-more-text"
        >{{!showFullText ? 'show more' : 'show less'}}</small>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["commentName", "commentDate", "comment"],
  data() {
    return {
      showFullText: false,
    };
  },
  computed: {
    commDate() {
      const date = new Date(this.commentDate);
      const fullDate = `${date.getMonth() + 1}/${date.getDate()}/${date
        .getFullYear()
        .toString()
        .slice(2)}`;
      return fullDate;
    },
  },
  methods: {
    showFullComment() {
      this.showFullText = !this.showFullText;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixin";
.comment:not(:first-child) {
  border-top: 1px solid var(--clr-accent);
  padding-top: 1em;
}
.comment {
  &__student-info {
    @include flexOptions(flex, null, center, 1rem);
    .first-student-letter {
      @include gridOptions(grid, center, null);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--clr-accent);
      font-weight: bold;
      color: #e2e4e9;
    }
    .name_date {
      line-height: 0;
      small {
        font-size: 10px;
      }
    }
  }
  .student-comment {
    margin-top: 1rem;
    .show-more-text {
      display: block;
      font-weight: bold;
      cursor: pointer;
      text-decoration: underline 2px;
      text-underline-offset: 5px;
      width: fit-content;
      margin-top: 0.5rem;
      color: var(--clr-accent);
    }
    .comment-inline {
      display: inline;
    }
  }
}
</style>