<template>
  <div class="sidebar">
    <div class="user">
      <CustomSelect
        :options="userOptions"
        :default="userOptions[0]"
        class="select"
        :prefixIcon="'mdi-account'"
        @input="handleSelectUser"
      />
    </div>
    <div class="workday">
      <span class="workday-title">Ca Làm Việc</span>
      <div class="workday-box">
        <div class="status">
          <span class="workday-name">Ca Sáng</span>
          <span class="workday-color morning"></span>
        </div>
        <div class="status">
          <span class="workday-name">Ca Chiều</span>
          <span class="workday-color afternoon"></span>
        </div>
        <div class="status">
          <span class="workday-name">Ca Tối</span>
          <span class="workday-color evening"></span>
        </div>
        <div class="status">
          <span class="workday-name">Cả Ngày</span>
          <span class="workday-color allday"></span>
        </div>
      </div>
    </div>

    <div class="search">
      <v-btn
        class="search-btn ma-2"
        color="primary"
        @click="handleSearch"
      >
        Tìm Kiếm
      </v-btn>
    </div>
  </div>
</template>

<script>
import CustomSelect from "~/components/CustomSelect"
export default {
  name: "CalendarSidebar",
  comments: [CustomSelect],
  data: () => ({
    userOptions: ["Nhân Viên A", "Nhân Viên D", "Nhân Viên C", "Nhân Viên D"],
    loading: false,
    searchData: {},
  }),
  methods: {
    handleSearch() {

      console.log(111111111, this.searchData);
    },

    handleSelectUser(data) {

    this.searchData = {data};


    }
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  padding: 10px 12px;
  .morning {
    background-color: #673ab7;
  }

  .afternoon {
    background-color: #ff9800;
  }

  .evening {
    background-color: rgb(11, 145, 255);
  }

  .allday {
    background-color: greenyellow;
  }
  .user {
  }

  .workday {
    .workday-title {
      font-size: 24px;
      margin-bottom: 8px;
    }
    .workday-box {
      margin-left: 16px;
      .status {
        display: flex;
        gap: 6px;
        align-items: center;

        .workday-name {
          font-size: 12px;
        }

        .workday-color {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }
    }
  }

  .search {
    .search-btn {
      background-color: rgb(59, 152, 240);
    }
  }
}
</style>
