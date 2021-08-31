<template>
  <div class="about">
    <h1>Submissions View</h1>
    <SubmissionsList />
  </div>
</template>

<script>
import SubmissionsList from "@/components/SubmissionsList";

export default {
  name: "Submissions",
  components: {
    SubmissionsList,
  },
};
</script>
