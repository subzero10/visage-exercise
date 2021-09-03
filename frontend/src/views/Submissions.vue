<template>
  <div class="submissions">
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
