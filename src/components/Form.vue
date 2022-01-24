<template>
  <div class="form">
    <div class="card">
      <h1>Contact Us</h1>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="username">Name</label>
          <input type="text" id="username" v-model.trim="userName" />
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="birthdate">Birthday</label>
          <input type="date" id="birthdate" v-model="birthDate" />
        </div>
        <div class="form-control-checkbox">
          <input
            type="checkbox"
            id="contact"
            value="contact"
            v-model="agreeToContact"
          />
          <label for="contact">I agree to be contacted via email.</label>
        </div>
        <div class="buttons">
          <button @click="clearInputs" class="clearBtn">Clear</button>
          <button :disabled="!formIsValid" class="submitBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";

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

      if (isNaN(new Date(this.birthDate).getTime())) {
        return false;
      }

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
    async submitForm() {
      const toast = useToast();

      if (this.formIsValid) {
        const response = await fetch(
          "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
          {
            method: "POST",
            body: JSON.stringify({
              name: this.userName,
              email: this.email,
              birthDate: this.birthDate,
              emailConsent: this.agreeToContact,
            }),
          }
        );

        if (response.ok) {
          this.clearInputs();
          toast.success("Form submitted", {
            timeout: 3000,
          });
          return;
        }

        const responseData = await response.json();

        if (!response.ok) {
          toast.error("Failed to submit", {
            timeout: 3000,
          });
          const error = new Error(responseData.message || "Failed");
          throw error;
        }
      }

      return;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 50px 100px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.form-control {
  margin: 40px 0px;
  display: flex;
  width: 400px;
  flex-direction: column;
}

.form-control-checkbox {
  display: flex;
  justify-content: flex-start;
  margin: 40px 0px;
}

.form-control-checkbox label {
  margin-left: 5px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  height: 35px;
}

.clearBtn {
  margin-right: 10px;
  width: 100px;
  border-radius: 10px;
  border: 1px solid;
  background: transparent;
  cursor: pointer;
}

.submitBtn {
  width: 100px;
  border-radius: 10px;
  border: 1px solid;
  background: transparent;
  cursor: pointer;
}

input[type="text"],
input[type="email"],
input[type="date"] {
  height: 25px;
  padding: 0px 3px;
}

label {
  display: flex;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
