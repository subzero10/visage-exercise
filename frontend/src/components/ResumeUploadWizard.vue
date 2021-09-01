<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form @submit="onSubmit" @reset="onReset">
            <div v-if="step === 1">
              <b-form-group label="Upload resume:" label-align="left">
                <b-form-file
                  v-model="file"
                  :state="Boolean(file)"
                  :accept="acceptedFileTypes"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div v-if="step === 2">
              <b-form-group label="Candidate Name:" label-align="left">
                <b-form-input
                  v-model="candidateName"
                  type="text"
                  placeholder="Enter candidate's name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Job Title:" label-align="left">
                <b-form-input
                  v-model="jobTitle"
                  type="text"
                  placeholder="Enter job title"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Notes:" label-align="left">
                <b-form-textarea v-model="notes"> </b-form-textarea>
              </b-form-group>
            </div>
            <div>
              <b-button
                v-show="step === 2"
                variant="outline-warning"
                @click="onReset"
              >
                Cancel
              </b-button>
              <b-button
                v-show="step === 2"
                variant="outline-secondary"
                @click="onBack"
              >
                Back
              </b-button>
              <b-button
                v-show="step === 1"
                variant="outline-primary"
                @click="onNext"
              >
                Next
              </b-button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "ResumeUploadWizard",
  data() {
    return {
      acceptedFileTypes: ".pdf, .docx, .doc",
      step: 2,
      file: null,
      candidateName: null,
      jobTitle: null,
      notes: null,
    };
  },
  methods: {
    onSubmit: function () {},
    onReset: function () {
      this.step = 1;
      this.file = null;
      this.candidateName = null;
      this.jobTitle = null;
      this.notes = null;
    },
    onNext: function () {
      this.step++;
    },
    onBack: function () {
      this.step--;
    },
  },
};
</script>

<style scoped></style>
