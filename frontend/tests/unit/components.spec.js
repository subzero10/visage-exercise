import { shallowMount } from "@vue/test-utils";
import ResumeUploadWizard from "@/components/ResumeUploadWizard.vue";

import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";

Vue.use(BootstrapVue);

describe("ResumeUploadWizard.vue", () => {
  it("does client side validation", () => {
    const wrapper = shallowMount(ResumeUploadWizard);
    expect(wrapper.vm.formIsValid).toBeFalsy();

    const file = new File([], "some file.pdf");
    wrapper.setData({
      file: file,
      fileUploading: false,
      fileUploaded: file,
      fileId: 1,
    });

    expect(wrapper.vm.formIsValid).toBeFalsy();

    wrapper.setData({
      candidateName: "test",
      jobTitle: "test",
    });

    expect(wrapper.vm.formIsValid).toBeTruthy();
  });
});
