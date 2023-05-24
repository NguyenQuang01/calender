<template>
  <div class="container">
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
                <div @click="save(item.id, item.password)">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>lưu</span>
                    </template>
                    <b-icon
                      variant="success"
                      icon="save"
                      aria-hidden="true"
                      class="h-4 w-4"
                    ></b-icon>
                  </a-tooltip>
                </div>
                <div @click="edit" class="mx-2">
                  <a-tooltip placement="topLeft">
                    <template slot="title">
                      <span>sửa</span>
                    </template>
                    <b-icon
                      variant="warning"
                      icon="pencil-square"
                      aria-hidden="true"
                      class="h-4 w-4"
                    ></b-icon>
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
                  <b-icon
                    variant="danger"
                    icon="trash"
                    aria-hidden="true"
                    class="h-4 w-4"
                  ></b-icon>
                  <!-- </div> -->
                </a-popconfirm>
              </div>
            </td>
          </tr>
        </table>

        <!-- <BtnBack class="float-right mb-10 mt-3 mr-0" /> -->
      </div>
    </div>
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

      search: { employeeName: "", laborCode: "", groupId: "" },
      textDelete: "Bạn có chắc chắn xóa ",
      userName: "",
    };
  },
  fetch() {
    this.getAllUser();
  },
  methods: {
    //     async getvalue() {
    //       //       const res = await getAllAcc(this.page.current, this.page.pageSize, {
    //       //         userName: this.userName,
    //       //       });
    //       //       if (res) {
    //       //       this.total = res.totalElements;
    //       this.data = [
    //         {
    //           userId: 1,
    //           userName: "admin",
    //           password:
    //             "$2a$12$zJAC8BAzYKMlONLexKgehOpIDvy/90y6w.VZXtnIqGaeAv3Wbqn9C",
    //           isView: true,
    //           isEdit: true,
    //           isReport: true,
    //           isAdmin: true,
    //           groupName: null,
    //         },
    //         {
    //           userId: 36,
    //           userName: "tomay01",
    //           password:
    //             "$2a$10$nHCn4gZwWPZHICJB49rWYeirjEkzyn8kNZlWyDtjAJEwAAwVgHF3S",
    //           isView: false,
    //           isEdit: true,
    //           isReport: true,
    //           isAdmin: false,
    //           groupName: "Tổ may 01",
    //         },
    //         {
    //           userId: 37,
    //           userName: "phongtchc",
    //           password:
    //             "$2a$10$oqAElowtk1nPHdywXmeQdOYvBc/Ua93ohdehoZlYEV6G8fDB.nHD6",
    //           isView: false,
    //           isEdit: true,
    //           isReport: true,
    //           isAdmin: false,
    //           groupName: "Phòng TCHC",
    //         },
    //         {
    //           userId: 38,
    //           userName: "tocdxn1",
    //           password:
    //             "$2a$10$ZlO6iCtI6sOOO9DJ7HjLP.p2O7RWEkTjzCOlVwveXl0Rye7zMgE.m",
    //           isView: false,
    //           isEdit: true,
    //           isReport: true,
    //           isAdmin: false,
    //           groupName: "Cơ Điện 1",
    //         },
    //         {
    //           userId: 39,
    //           userName: "tomay02",
    //           password:
    //             "$2a$10$cg8CewiDsQLj.6Nw9m4CB./0gmD2a6F8IUcEHxTE6YICeI19hMFEK",
    //           isView: false,
    //           isEdit: true,
    //           isReport: true,
    //           isAdmin: false,
    //           groupName: "Tổ may 02",
    //         },
    //       ];
    //       // this.data = res.content.map((item, index) => ({
    //       //   SL: index + 1,
    //       //   name: item.userName || "",
    //       //   password: item.password || 0,
    //       //   id: item.userId || "",
    //       // }));
    //       //       }
    //     },
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
    edit() {
      this.isEdit = !this.isEdit;
      this.data.map((item) => (item.password = ""));
    },
    async save(id, password) {
      console.log(id, password);
      const res = await updateAcc(id, password);
      if (res.code === 200 && res) {
        message.success("sửa thành công");
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
}
</style>
