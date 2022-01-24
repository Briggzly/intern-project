<template>
  <div>
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
      <label for="username">Name</label>
      <input type="text" id="username" v-model.trim="userName" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model.trim="email" />
      <label for="birthdate">Birthday</label>
      <input type="date" id="birthdate" v-model="birthDate" />
      <input
        type="checkbox"
        id="contact"
        value="contact"
        v-model="agreeToContact"
      />
      <label for="contact">I agree to be contacted via email.</label>
      <button @click="clearInputs" class="clearBtn">Clear</button>
      <button :disabled="!formIsValid" class="submitBtn">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      email: "",
      birthDate: null,
      agreeToContact: false,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.userName &&
        this.validEmail &&
        this.validBirthdate &&
        this.agreeToContact
      );
    },
    validBirthdate() {
      if (!this.birthDate) return true;

      return this.birthDate && typeof this.birthDate !== "undefined";
    },
    validEmail() {
      return this.email && this.email.includes("@");
    },
  },
  methods: {
    clearInputs() {
      this.userName = "";

      this.email = "";

      this.birthDate = null;

      this.agreeToContact = false;
    },
    submitForm() {
      if (this.formIsValid) return console.log("valid");

      return console.log("not valid");
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
