<template>
  <div class="container">
    <div class="form2">
      <b-form @submit="onSubmit" v-if="show" class="form">
        <b-form-group id="input-group-1" label="Email :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="mt-5">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/api/loginService";
import PersonService from "../../services/api/personService";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      SignUp: {
        address: "string",
        birthDay: "1990-02-05",
        description: "string",
        email: "abcd@gmail.com",
        fullName: "Nguyen Văn A",
        password: "quang",
        phoneNumber: "0969686868",
        role: 1,
        sex: 0,
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      try {
        const res = await LoginService.postLogin("login", this.form);
        localStorage.setItem("isAdmin", res.data.data.isAdmin);
        localStorage.setItem("token", res.data.data.token);
        this.$auth.strategy.token.set("local", "Bearer " + res.data.data.token);
        this.$axios.setHeader("Authorization", "Bearer " + res.data.data.token);
        this.$auth.ctx.app.$axios.setHeader(
          "Authorization",
          "Bearer " + res.data.data.token
        );
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.form2 {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}
</style>
