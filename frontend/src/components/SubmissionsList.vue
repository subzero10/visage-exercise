<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-table
            id="candidates-table"
            :busy.sync="isLoading"
            primary-key="id"
            :items="getCandidates"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            small
          >
            <template #cell(notes)="data">
              <div class="overflow-ellipsis" :title="data.item.notes">
                {{ data.item.notes || "-" }}
              </div>
            </template>

            <template #cell(resume)="data">
              <a
                :href="getResumeDownloadLink(data.item.resumeId)"
                style="text-decoration: none"
                >💾
              </a>
            </template>
          </b-table>

          <br />

          <b-pagination
            align="center"
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="perPage"
            aria-controls="candidates-table"
          ></b-pagination>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getCandidates } from "@/services/CandidatesService";
import { showToast } from "@/utils/toasts";
import { defaultPageSize } from "@/utils/config";

export default {
  name: "SubmissionsList",
  data() {
    return {
      isLoading: false,
      fields: ["name", "jobTitle", "notes", { key: "resume", label: "Resume" }],
      perPage: defaultPageSize,
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
      candidates: [],
    };
  },
  methods: {
    getCandidates: function (ctx) {
      return getCandidates(ctx.currentPage, ctx.perPage)
        .then((res) => {
          this.currentPage = res.data.currentPage;
          this.totalItems = res.data.totalItems;
          this.totalPages = res.data.totalPages;
          this.candidates = res.data.candidates;
          return this.candidates;
        })
        .catch((err) => {
          showToast(this, err.message, "danger");
        });
    },
    getResumeDownloadLink: function (resumeId) {
      return `/api/resume/${resumeId}`;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  text-align: left;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 300px;
}
</style>
