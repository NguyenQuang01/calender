<template>
  <div class="container">
    <div class="form2">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="mt-5">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { signInAPI } from "@/api/AuthenConnector.js";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const res = await signInAPI(this.form);
      res ? console.log(res) : "";
      // alert(JSON.stringify(this.form));
      // this.$router.push("/home");
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
.form {
  width: 20%;
}
</style>
