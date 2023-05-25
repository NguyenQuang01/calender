<template lang="">
  <div>
    <div class="title">Edit Information</div>
    <div class="container form2">
      <b-form @submit="submitSignUp" class="form">
        <b-form-group id="input-group-1" label="FullName :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="SignUp.fullName"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="BirthDay :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="SignUp.birthDay"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Address :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="SignUp.address"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="PhoneNumber :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="SignUp.phoneNumber"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Email :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="SignUp.email"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Password :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="SignUp.password"
            type="password"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Role :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="SignUp.role"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Sex :" label-for="input-1">
          <a-select v-model="SignUp.sex">
            <a-select-option value="0"> Girl </a-select-option>
            <a-select-option value="1"> Man </a-select-option>
            <a-select-option value="2">Unknown</a-select-option>
          </a-select>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Description :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="SignUp.description"
            type="text"
            placeholder="Enter "
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="mt-5">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import PersonService from "~/services/api/personService.js";

export default {
  data() {
    return {
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
    };
  },
  fetch() {
    Promise.all([this.getValueId()]);
  },
  mounted() {
    this.getValueId();
  },
  methods: {
    async getValueId() {
      const id = this.$route.params.id;
      const url = `admin/user-manager/detail/${id}`;
      try {
        const res = await PersonService.get(url);
        if (res) {
          this.SignUp = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async submitSignUp(event) {
      event.preventDefault();

      const id = this.$route.params.id;
      const url = `admin/user-manager/update/${id}`;
      try {
        const res = await PersonService.put(url, this.SignUp);
        if (res) {
          this.$message.success("sửa thành công");
          this.getValueId();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.form2 {
  width: 20%;
  margin-top: 1%;
  display: flex;
  justify-content: center;
}
.form {
  width: 100%;
}
.title {
  margin-top: 5%;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}
</style>
