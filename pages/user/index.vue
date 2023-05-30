<template>
  <div class="container">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Sign up">
        <b-form @submit="submitSignUp" class="formSignUp">
          <b-form-group
            id="input-group-1"
            label="FullName :"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="SignUp.fullName"
              type="text"
              placeholder="Enter "
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="BirthDay :"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="SignUp.birthDay"
              type="date"
              placeholder="Enter "
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Address :"
            label-for="input-1"
          >
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
              type="number"
              placeholder="Enter "
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Email :" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="SignUp.email"
              type="email"
              placeholder="Enter "
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Password :"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="SignUp.password"
              type="password"
              placeholder="Enter "
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-1" label="Role :" label-for="input-1">
            <a-select v-model="SignUp.role">
              <a-select-option value="1"> User </a-select-option>
              <a-select-option value="2"> Admin </a-select-option>
            </a-select>
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
      </a-tab-pane>
      <a-tab-pane key="2" tab="List Account" force-render>
        <div class="text-center mt-16 text-3xl font-bold title2">
          Danh Sách Tài Khoản
        </div>
        <div class="text-center mt-2 font-semibold mb-10"></div>
        <div class="max-w-2xl m-auto m-0">
          <div class="mt-6 table">
            <table id="customers " class="w-full">
              <tr class="bg-slate-100">
                <th class="title">STT</th>
                <th class="title">TÀI KHOẢN</th>
                <th class="title">MẬT KHẨU</th>
                <th class="title">HÀNH ĐỘNG</th>
              </tr>
              <tr>
                <td></td>
                <td>
                  <b-form-input
                    id="input-1"
                    class="inputLogin"
                    type="text"
                    placeholder="Tìm kiếm"
                    v-model="userName"
                    @input="searchName"
                  ></b-form-input>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="(item, index) in data" :key="index">
                <td class="w-5 text-center title">{{ index + 1 }}</td>
                <td class="w-3/5">
                  <div>{{ item.email }}</div>
                </td>
                <td class="w-1/5">
                  <b-form-input
                    v-model="item.password"
                    class="w-full h-8"
                    v-if="isEdit"
                  />
                  <div v-else>*******</div>
                </td>
                <td style="text-align: center" class="w-40">
                  <div class="listBtn">
                    <div @click="edit(item.userId)" class="mx-2">
                      <a-tooltip placement="topLeft">
                        <template slot="title">
                          <span>sửa</span>
                        </template>
                        <a-icon type="user" />
                      </a-tooltip>
                    </div>
                    <a-popconfirm
                      placement="topRight"
                      ok-text="Có"
                      cancel-text="Không"
                      @confirm="confirm(item.userId)"
                    >
                      <template slot="title">
                        <p>{{ textDelete }}</p>
                      </template>
                      <!-- <div @click="deletes(item.id)"> -->
                      <a-icon type="delete" />
                      <!-- </div> -->
                    </a-popconfirm>
                  </div>
                </td>
              </tr>
            </table>

            <!-- <BtnBack class="float-right mb-10 mt-3 mr-0" /> -->
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import TableCustom from "~/components/TableCustom";
import PersonService from "../../services/api/personService";

import CalendarSidebar from "~/components/CalendarSidebar";
export default {
  name: "table",
  components: {
    TableCustom,
    CalendarSidebar,
  },
  data() {
    return {
      total: "",
      isEdit: false,
      parts: [],
      parts2: [],
      form: {
        // parentId: "",
        demarcation: "",
        id: "",
      },
      data: [],
      SignUp: {
        address: "",
        birthDay: "",
        description: "",
        email: "",
        fullName: "",
        password: "",
        phoneNumber: "",
        role: null,
        sex: null,
      },
      search: { employeeName: "", laborCode: "", groupId: "" },
      textDelete: "Bạn có chắc chắn xóa ",
      userName: "",
    };
  },
  fetch() {
    this.getAllUser();
  },
  methods: {
    formattedDate(param) {
      const parts = param.split("-");
      const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
      return formatted;
    },
    async submitSignUp(event) {
      event.preventDefault();

      const url = `admin/user-manager/add`;
      try {
        this.SignUp.birthDay = this.formattedDate(this.SignUp.birthDay);
        const res = await PersonService.post(url, this.SignUp);
        if (res) {
          this.$message.success("success");
        }
      } catch (error) {
        this.$message.error("Invalid Phone Number");
      }
    },
    async getAllUser() {
      const url = `admin/user-manager`;
      try {
        const res = await PersonService.get(url);
        if (res) {
          console.log(res);
          this.data = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    searchName() {
      this.getvalue();
    },
    confirm(id) {
      this.deletes(id);
    },

    onShowSizeChange(current, pageSize) {
      this.page.current = current;
      this.page.pageSize = pageSize;
      this.getvalue();
    },
    async edit(id) {
      this.$router.push("/user/" + id);
    },
    async save(id, password) {
      console.log(id, password);
      const res = await updateAcc(id, password);
      if (res.code === 200 && res) {
        // message.success("sửa thành công");
      }
      this.isEdit = !this.isEdit;
    },
    async deletes(id) {
      const url = `admin/user-manager/detele/${id}`;
      try {
        const res = await PersonService.delete(url);
        if (res) {
          console.log(res);
          this.data = res.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.all-box {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  .sidebar {
  }

  .calendar {
    margin: 4px;
  }
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.with100 {
  width: 104%;
}
.save {
  background-color: #069d72;
  margin-right: 5px;
  padding: 2px 10px;
  border: none;
  border-radius: 20px;
}
.edit {
  background-color: #f2c34a;
  margin: 2px 0;
  margin-right: 5px;
  padding: 2px 8px;
  border: none;
  border-radius: 20px;
}
.inputLogin {
  border-radius: 50px;
  height: 32px;
}
.delete {
  background-color: #eb6e6e;
  padding: 2px 10px;
  border-radius: 20px;
  border: none;
}
.add-btn {
  background-color: #045396;
  border: none;
}
.title {
  color: #045396;
}
.bttAdd {
  margin-bottom: -13px;
}
.borderRadius {
  border-radius: 50px;
}
.wFull {
  width: 100% !important;
}
.title2 {
  font-size: 20px;
}
.table {
  display: flex;
  justify-content: center;
}
.listBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.formSignUp {
  width: 20%;
  margin: auto;
}
</style>
