import { mount } from "@vue/test-utils";

import Form from "../components/Form.vue";

describe("Form", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Form);
  });

  test("Submit button should be disabled if username is blank", async () => {
    expect(wrapper.find("#email").toBe("Kyson@gmail.com"));
    expect(wrapper.find("#birthdate"));
    expect(wrapper.find("#username").toBe(""));
    expect(wrapper.find(".submitBtn").toBeDisabled());
  });
});
