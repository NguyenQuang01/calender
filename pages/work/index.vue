<template>
  <div class="all-box">
    <div class="sidebar">
      <CalendarSidebar @searchValue="onSearch" />
    </div>
    <div class="calendar">
      <TableCustom :searchValue="searchKey" />
    </div>
  </div>
</template>

<script>
import TableCustom from "~/components/TableCustom";
import CalendarSidebar from "~/components/CalendarSidebar";
export default {
  name: "table",
  components: {
    TableCustom,
    CalendarSidebar,
  },
  data() {
    return {
      searchKey: "",
    };
  },
  watch: {
    searchKey: {
      handler(value) {
      },
    },
  },
  methods: {
    onSearch(data) {
      this.searchKey = data;
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
</style>
