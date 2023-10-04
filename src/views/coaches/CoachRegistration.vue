<template>
  <main>
    <base-card>
      <h3>Coach Details</h3>
      <CoachForm @save-form="saveData" />
    </base-card>
  </main>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm";
export default {
  components: {
    CoachForm,
  },
  data() {
    return {};
  },
  methods: {
    saveData(dataForm) {
      this.$store.dispatch("coaches/registerCoach", dataForm);
      this.$router.replace("/coaches");
    },
  },
};
</script>