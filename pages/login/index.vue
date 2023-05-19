<template>
  <div class="container">
    <div class="form2">
      <b-form @submit="onSubmit" v-if="show" class="form">
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
import LoginService from "@/services/api/loginService";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: true,
    };
  },
  created() {
    const week = this.$moment().year(2023).week(21);
    console.log("11111 ~ file: index.vue:52 ~ week:", week);
    const startOfWeek = week.startOf("week").format("YYYY-MM-DD");

    console.log("11111 ~ file: index.vue:466 ~ startOfWeek:", startOfWeek);

    const endOfWeek = week.endOf("week").format("YYYY-MM-DD");

    console.log("11111 ~ file: index.vue:470 ~ endOfWeek:", endOfWeek);
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      try {
        const res = await LoginService.postLogin("login", this.form);
        this.$auth.strategy.token.set("local", "Bearer " + res.data.data.token);
        this.$axios.setHeader("Authorization", "Bearer " + res.data.data.token);
        this.$auth.ctx.app.$axios.setHeader(
          "Authorization",
          "Bearer " + res.data.data.token
        );
        window.location.href("/");
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
.form {
  width: 20%;
}
</style>
