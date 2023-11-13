<template>
  <main>
    <base-dialog title="An error occured!" :showDialog="!!error" @close-dialog="dialogClose">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <h2>Add Comment</h2>
      <form @submit.prevent="commentForm">
        <BaseInputfield
          type="text"
          placeholder="name"
          text="Name"
          @two-way="name"
          :err="{error: !studentName.isValid}"
        />
        <BaseTextarea
          maxlength="1000"
          placeholder="Add comment"
          @two-way="comment"
          :coun="resetValue || 0"
          :value="studentComment.value"
          :err="{error: !studentComment.isValid}"
        />
        <small v-if="!commentValidate">Please complete all required fields.</small>
        <base-button id="btn" type="submit">commnet</base-button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      studentName: {
        value: "",
        isValid: true,
      },
      studentComment: {
        value: "",
        isValid: true,
      },
      commentValidate: true,
      resetValue: null,
      error: null,
    };
  },
  methods: {
    name(val) {
      this.studentName.value = val;
      if (this.studentName.value.length >= 5) this.studentName.isValid = true;
    },
    comment(e, coun) {
      this.studentComment.value = e.target.value;
      this.resetValue = coun;
      if (this.studentComment.value.length >= 10)
        this.studentComment.isValid = true;
    },
    checkInputValidation() {
      this.commentValidate = true;

      if (this.studentName.value === "") {
        this.studentName.isValid = false;
        this.commentValidate = false;
      }

      if (
        this.studentComment.value === "" ||
        this.studentComment.value.length < 10
      ) {
        this.studentComment.isValid = false;
        this.commentValidate = false;
      }
    },
    async commentForm() {
      this.checkInputValidation();
      switch (!this.commentValidate) {
        case !this.studentName.isValid:
        case !this.studentComment.isValid:
          if (!this.commentValidate) return;
      }
      const commentData = {
        coachId: this.$route.params.id,
        name: this.studentName.value,
        comment: this.studentComment.value,
      };

      try {
        await this.$store.dispatch("comments/addComments", commentData);
        this.$router.replace(`/coaches/${this.$route.params.id}`);
      } catch (err) {
        console.log(err);
        this.error = "failed to add comment" || err.message;
      }
    },
    dialogClose() {
      this.error = null;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixin";

section {
  position: relative;
  padding-bottom: 1em;
  margin-bottom: 1rem;

  &::before {
    content: "";
    @include positionOptions(absolute, auto auto 0 50%, -50%, 0);
    width: 200%;
    border-bottom: 4px solid var(--clr-accent);
  }

  h2 {
    margin-bottom: 1rem;
  }

  form {
    button {
      margin: 1rem 0 0 auto;
      display: block;
      @include breakPoint("small-screen") {
        width: calc(100% - 2.1rem);
        text-align: center;
      }
    }
  }
}
</style>