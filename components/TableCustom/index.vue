<template>
  <div>
    <div class="toolbar">
      <div v-if="this.datePicker.startDate" class="date-range">
        <span>{{ this.datePicker.startDate }}</span>
        -
        <span>{{ this.datePicker.endDate }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" color="success">Duyệt Cho Tất Cả</v-btn>
      <a-week-picker :locale="locale" :allowClear="true" @change="onChange" />
    </div>
    <!-- -------------------table----------------------- -->
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :pagination="false"
    >
      <div class="tag-box" slot="monday" slot-scope="monday">
        <a-tag
          v-for="tag in monday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="tuesday" slot-scope="tuesday">
        <a-tag
          v-for="tag in tuesday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="wednesday" slot-scope="wednesday">
        <a-tag
          v-for="tag in wednesday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="thursday" slot-scope="thursday">
        <a-tag
          v-for="tag in thursday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="friday" slot-scope="friday">
        <a-tag
          v-for="tag in friday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="saturday" slot-scope="saturday">
        <a-tag
          v-for="tag in saturday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="sunday" slot-scope="sunday">
        <a-tag
          v-for="tag in sunday"
          :key="tag.id"
          :color="colorTag(tag.shiftName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
    </a-table>
  </div>
</template>
<script>
import AdminService from "../../services/api/adminService";

export default {
  name: "TableCustom",

  props: {
    searchValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      locale: {
        timePickerLocale: {
          placeholder: "Chọn thời gian",
        },
        firstDayOfWeek: 1, // 1 đại diện cho thứ 2
      },
      dataSource: [],
      columns: [
        {
          title: "Nhân Viên",
          dataIndex: "name",
          width: "16%",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
        },
        {
          title: "Sunday",
          dataIndex: "sunday",
          key: "sunday",
          width: "12%",
          scopedSlots: { customRender: "sunday" },
        },
        {
          title: "Monday",
          dataIndex: "monday",
          key: "monday",
          width: "12%",
          scopedSlots: { customRender: "monday" },
        },
        {
          title: "Tuesday",
          dataIndex: "tuesday",
          key: "tuesday",
          width: "12%",
          scopedSlots: { customRender: "tuesday" },
        },
        {
          title: "Wednesday",
          dataIndex: "wednesday",
          key: "wednesday",
          width: "12%",
          scopedSlots: { customRender: "wednesday" },
        },
        {
          title: "Thursday",
          dataIndex: "thursday",
          key: "thursday",
          width: "12%",
          scopedSlots: { customRender: "thursday" },
        },
        {
          title: "Friday",
          dataIndex: "friday",
          key: "friday",
          width: "12%",
          scopedSlots: { customRender: "friday" },
        },
        {
          title: "Saturday",
          dataIndex: "saturday",
          key: "saturday",
          width: "12%",
          scopedSlots: { customRender: "saturday" },
        },
      ],
      datePicker: {
        startDate: "",
        endDate: "",
      },
      userName: "",
      page: 1,
      defaultValue: new Date(),
    };
  },
  watch: {
    datePicker: {
      handler() {
        this.getUserSchedule();
      },
      deep: true,
    },
    searchValue: {
      handler() {
        this.getUserSchedule();
      },
    },
  },
  mounted() {
    this.defaultValue = this.getCurrentWeek();
  },
  fetch() {
    Promise.all[this.getUserSchedule()];
  },
  methods: {
    getCurrentWeek() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentWeek = this.getWeekNumber(currentDate);
      return { week: currentWeek, year: currentYear };
    },
    getWeekNumber(date) {
      const onejan = new Date(date.getFullYear(), 0, 1);
      const millisecsInDay = 86400000;
      return Math.ceil(
        ((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7
      );
    },
    colorTag(tagName) {
      if (tagName === "Work At Company") {
        return "#673ab7";
      }
      if (tagName === "Go On Bussiness") {
        return "#ff9800";
      }
      if (tagName === "Work at Home") {
        return "#0b91ff";
      }
      if (tagName === "Leave") {
        return "greenyellow";
      }
    },
    onChange(date, dateString) {
      if (dateString) {
        const weekNumber = parseInt(
          dateString.split("-")[1].match(/\d+/)[0],
          10
        );
        const year = parseInt(dateString.split("-")[0]);
        const week = this.$moment().year(year).week(weekNumber);
        const startOfWeek = week.startOf("week").format("YYYY-MM-DD");
        const endOfWeek = week.endOf("week").format("YYYY-MM-DD");
        this.datePicker.startDate = startOfWeek;
        this.datePicker.endDate = endOfWeek;
      }
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },

    async getUserSchedule() {
      let url = `?endDate=${this.datePicker.endDate}&startDate=${this.datePicker.startDate}`;
      if (this.searchValue) {
        url += `&employeeName=${this.searchValue}`;
      }
      try {
        const res = await AdminService.getUserSchedule(url);
        this.dataSource = res.data.data.content;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.tag-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: flex-start;
}
.toolbar {
  display: flex;
  align-items: center;
}
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
