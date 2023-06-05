<template>
  <div class="sidebar">
    <div class="user"></div>
    <div class="workday">
      <span class="workday-title">Works </span>
      <div class="workday-box">
        <div class="status">
          <span class="workday-name"> Work At Company</span>
          <span class="workday-color morning"></span>
        </div>
        <div class="status">
          <span class="workday-name">Work at Home</span>
          <span class="workday-color afternoon"></span>
        </div>
        <div class="status">
          <span class="workday-name">Go On Bussiness</span>
          <span class="workday-color evening"></span>
        </div>
        <div class="status">
          <span class="workday-name">Leave</span>
          <span class="workday-color allday"></span>
        </div>
      </div>
    </div>

    <div class="search">
      <a-input-search
        placeholder="Enter Employee Name..."
        enter-button="Search"
        @search="onSearch"
      />
    </div>
  </div>
</template>

<script>
import CustomSelect from "~/components/CustomSelect";
export default {
  name: "CalendarSidebar",
  comments: [CustomSelect],
  data: () => ({
    userOptions: ["Nhân Viên A", "Nhân Viên D", "Nhân Viên C", "Nhân Viên D"],
    loading: false,
  }),
  methods: {
    onSearch(value) {
      this.$emit("searchValue", value);
    },

    handleSelectUser(data) {
      this.searchData = { data };
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  padding: 10px 12px;
  .morning {
    background-color: Red;
  }

  .afternoon {
    background-color: Green;
  }

  .evening {
    background-color: Blue;
  }

  .allday {
    background-color: Purple;
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
          font-size: 16px;
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
