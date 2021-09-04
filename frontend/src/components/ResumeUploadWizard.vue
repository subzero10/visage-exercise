<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-progress
            :style="{ visibility: fileUploading ? 'visible' : 'hidden' }"
            :value="fileUploadProgress"
            :max="100"
            show-progress
            animated
          ></b-progress>
          <div class="form-container" v-if="step === 1">
            <b-form-group label="Upload resume:" label-align="left">
              <b-form-file
                v-model="file"
                :accept="acceptedFileTypes"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <div style="text-align: right">
              <b-button
                v-show="step === 1"
                variant="primary"
                @click="onNext"
                class="mr-2"
              >
                Next
              </b-button>
            </div>
          </div>
          <div class="form-container" v-if="step === 2">
            <b-form-group label="Candidate Name:" label-align="left">
              <b-form-input
                v-model="candidateName"
                :state="inputStates['candidateName']"
                @change="validateInputState('candidateName')"
                aria-describedby="input-live-help input-live-feedback"
                type="text"
                placeholder="Enter candidate's name"
                required
              ></b-form-input>
              <b-form-invalid-feedback
                id="input-live-feedback"
                class="text-left"
              >
                This field cannot be empty.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Job Title:" label-align="left">
              <b-form-input
                v-model="jobTitle"
                :state="inputStates['jobTitle']"
                @change="validateInputState('jobTitle')"
                aria-describedby="input-live-help input-live-feedback"
                type="text"
                placeholder="Enter job title"
                required
              ></b-form-input>
              <b-form-invalid-feedback
                id="input-live-feedback"
                class="text-left"
              >
                This field cannot be empty.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Notes:" label-align="left">
              <b-form-textarea v-model="notes"></b-form-textarea>
            </b-form-group>
          </div>
          <div style="text-align: right">
            <b-button
              v-show="step === 2"
              variant="warning"
              @click="onReset"
              class="mr-2"
            >
              Cancel
            </b-button>
            <b-button
              v-show="step === 2"
              variant="secondary"
              @click="onBack"
              class="mr-2"
            >
              Back
            </b-button>
            <b-button
              v-show="step === 2"
              variant="primary"
              @click="onSubmit"
              :disabled="!formIsValid || formIsSubmitting"
              class="mr-2"
            >
              Submit
              <b-spinner
                small
                label="saving"
                style="vertical-align: sub"
                v-show="formIsSubmitting"
              ></b-spinner>
            </b-button>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { storeFile } from "@/services/ResumeService";
import { createCandidate } from "@/services/CandidatesService";
import { showToast, showErrorToast } from "@/utils/toasts";
import { generateSource } from "@/utils/source-generator";

export default {
  name: "ResumeUploadWizard",
  data() {
    return {
      inputStates: {
        candidateName: null,
        jobTitle: null,
      },
      acceptedFileTypes: ".pdf, .docx, .doc",
      step: 1,
      file: null,
      fileId: null,
      fileUploadProgress: 0,
      fileUploading: false,
      fileUploaded: false,
      candidateName: null,
      jobTitle: null,
      notes: null,
      formIsSubmitting: false,
      uploadSource: null,
    };
  },
  methods: {
    onSubmit: function () {
      if (this.formIsSubmitting) {
        return;
      }
      this.formIsSubmitting = true;
      createCandidate({
        name: this.candidateName,
        jobTitle: this.jobTitle,
        notes: this.notes,
        resumeId: this.fileId,
        source: this.uploadSource,
      })
        .then((res) => {
          const submissionsCount = res.data.submissionsCount;
          const message = res.data.bonusMessage || "Candidate submit success!";
          showToast(
            this,
            `Submission number ${submissionsCount}`,
            message,
            "success"
          );
          this.formIsSubmitting = false;
          this.onReset();
        })
        .catch((err) => {
          this.formIsSubmitting = false;
          showErrorToast(this, err);
        });
    },
    onReset: function () {
      this.step = 1;
      this.file = null;
      this.fileId = null;
      this.fileUploading = false;
      this.fileUploaded = null;
      this.candidateName = null;
      this.jobTitle = null;
      this.notes = null;
      for (let i in this.inputStates) {
        this.inputStates[i] = null;
      }
    },
    onNext: function () {
      if (this.file && !this.fileUploading && this.fileUploaded !== this.file) {
        this.fileUploadProgress = 0;
        this.fileUploaded = null;
        this.fileUploading = true;
        storeFile(this.file, (ev) => {
          this.fileUploadProgress = Math.round((ev.loaded * 100) / ev.total);
        })
          .then((res) => {
            this.fileId = res.data.resume.id;
            this.fileUploaded = this.file;
            //sometimes this is too fast, so we delay a little
            setTimeout(() => (this.fileUploading = false), 500);
          })
          .catch((err) => {
            this.fileUploaded = null;
            this.fileUploading = false;
            showErrorToast(this, err);
          });
      }
      this.step++;
    },
    onBack: function () {
      this.step--;
    },
    validateInputState: function (inputName) {
      this.inputStates[inputName] = this[inputName].length > 0;
    },
  },
  computed: {
    formIsValid: function () {
      return !!(
        !this.fileUploading &&
        this.file &&
        this.fileUploaded &&
        this.file === this.fileUploaded &&
        this.fileId &&
        this.candidateName &&
        this.jobTitle
      );
    },
  },
  mounted() {
    if (!this.uploadSource) {
      generateSource().then((visitorId) => (this.uploadSource = visitorId));
    }
  },
};
</script>

<style scoped>
.form-container {
  height: 300px;
}

button {
  margin: 5px;
}
</style>
