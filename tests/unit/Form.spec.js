import { mount } from "@vue/test-utils";

import Form from "../../src/components/Form.vue";

const MOCK_DATA = {
  userName: "KysonB",
  email: "kyson@gmail.com",
  birthDate: new Date(),
};

describe("Form", () => {
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
    wrapper = mount(Form);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Submit button should be disabled if username is blank", async () => {
    wrapper.find("#email").setValue("kyson@gmail.com");
    expect(wrapper.find(".submitBtn").element.disabled).toBe(true);
  });

  test("form should be disabled if birthDate is invalid", async () => {
    await wrapper.setData({
      birthDate: "INVALID",
      email: MOCK_DATA.email,
      userName: MOCK_DATA.userName,
      agreeToContact: true,
    });

    expect(wrapper.find(".submitBtn").element.disabled).toBe(true);

    await wrapper.setData({
      birthDate: new Date(),
    });

    expect(wrapper.find(".submitBtn").element.disabled).toBe(false);
  });

  test("form should be enabled if we are given everything but a birthdate", async () => {
    await wrapper.setData({
      birthDate: null,
      email: MOCK_DATA.email,
      userName: MOCK_DATA.userName,
      agreeToContact: true,
    });

    expect(wrapper.find(".submitBtn").element.disabled).toBe(false);
  });

  it("should call the API with a valid request body on submit and clear all inputs", async () => {
    fetch.mockResponse(JSON.stringify({ success: "true" }), {
      status: 201,
      statusText: "ok",
    });

    await wrapper.setData({
      birthDate: MOCK_DATA.birthDate,
      email: MOCK_DATA.email,
      userName: MOCK_DATA.userName,
      agreeToContact: true,
    });

    const submitBtn = wrapper.find(".submitBtn");

    expect(submitBtn.element.disabled).toBe(false);

    await submitBtn.trigger("submit");

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
      {
        method: "POST",
        body: JSON.stringify({
          name: MOCK_DATA.userName,
          email: MOCK_DATA.email,
          birthDate: MOCK_DATA.birthDate,
          emailConsent: true,
        }),
      }
    );

    expect(wrapper.find("#email").element.value).toEqual("");
    expect(wrapper.find("#username").element.value).toEqual("");
    expect(wrapper.find("#birthdate").element.value).toEqual("");
    expect(wrapper.vm.agreeToContact).toEqual(false);
  });
});
