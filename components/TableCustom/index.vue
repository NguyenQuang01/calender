<template>
  <div>
    <div class="toolbar">
      <div v-if="this.datePicker.startDate" class="date-range">
        <span>{{ this.datePicker.startDate }}</span>
        -
        <span>{{ this.datePicker.endDate }}</span>
      </div>
      <v-spacer></v-spacer>
      <a-week-picker
        class="ma-2"
        :locale="locale"
        :allowClear="true"
        @change="onChange"
      />
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
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="tuesday" slot-scope="tuesday">
        <a-tag
          v-for="tag in tuesday"
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="wednesday" slot-scope="wednesday">
        <a-tag
          v-for="tag in wednesday"
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="thursday" slot-scope="thursday">
        <a-tag
          v-for="tag in thursday"
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="friday" slot-scope="friday">
        <a-tag
          v-for="tag in friday"
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="saturday" slot-scope="saturday">
        <a-tag
          v-for="tag in saturday"
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
      <div class="tag-box" slot="sunday" slot-scope="sunday">
        <a-tag
          v-for="tag in sunday"
          @click="handleClickTag(tag)"
          :key="tag.id"
          :color="colorTag(tag.workTypeName)"
        >
          {{ `${tag.startTime} - ${tag.endTime}` }}
        </a-tag>
      </div>
    </a-table>

    <!-- modal -->
    <a-modal :visible="selectedOpen" :footer="null" :closable="false">
      <v-card color="grey lighten-4" flat>
        <v-toolbar dark>
          <!--eslint-disable vue/no-v-text-v-html-on-component-->
          <!-- <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title> -->
          <v-spacer></v-spacer>
          <v-btn icon @click="handleDeleteEvent">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <!-- <span v-html="selectedEvent.details"></span> -->
          <div class="form-events">
            <a-form :form="form" @submit="handleUpdateEvent">
              <a-form-item label="Title">
                <a-input
                  v-decorator="[
                    'title',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Title!',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
              <a-form-item label="Description">
                <a-textarea v-decorator="['description']" />
              </a-form-item>

              <div style="display: flex; gap: 4px">
                <a-form-item label="Work Date">
                  <a-input v-decorator="['workDate']" />
                </a-form-item>
                <a-form-item label="Start Time">
                  <a-input v-decorator="['startTime']" format="HH:mm" />
                </a-form-item>
                <a-form-item label="End Time">
                  <a-input v-decorator="['endTime']" format="HH:mm" />
                </a-form-item>
              </div>
              <div style="display: flex; gap: 4px">
                <a-form-item label="Shift" style="width: 100%">
                  <a-select
                    v-decorator="[
                      'shiftId',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Please select shift!',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="option in workType"
                      :key="option.id"
                      :value="option.id"
                      >{{ option.name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
                <a-form-item label="Work Type" style="width: 100%">
                  <a-select
                    v-decorator="[
                      'workTypeId',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Please select work type!',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="option in shiftOptions"
                      :key="option.id"
                      :value="option.id"
                      >{{ option.name }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </div>
              <a-form-item>
                <a-button type="primary" html-type="submit"> Save </a-button>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </a-form-item>
            </a-form>
          </div>
        </v-card-text>
      </v-card>
    </a-modal>
  </div>
</template>
<script>
import AdminService from "../../services/api/adminService";
import PersonService from "../../services/api/personService";
import getDaysBetween from "../../utils/getDaysBetween";
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
      form: {},
      dateRangeSelected: [],
      selectedOpen: false,
      shiftOptions: [],
      workType: [],
      selectedEventId: null,
    };
  },
  beforeMount() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  watch: {
    datePicker: {
      handler(value) {
        this.dateRangeSelected = getDaysBetween(value.startDate, value.endDate);

        const cols = this.columns.map((column, index) => {
          return {
            ...column,
            title:
              column.dataIndex === "name"
                ? column.title
                : () => {
                    if (index <= this.dateRangeSelected.length) {
                      const date = this.dateRangeSelected[index - 1];
                      return (
                        <div>
                          {column.title}
                          <br />
                          {date}
                        </div>
                      );
                    }
                  },
          };
        });
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
    Promise.all[
      (this.getUserSchedule(), this.getListShifts(), this.getWorkTypes())
    ];
  },
  methods: {
    async getListShifts() {
      try {
        const res = await PersonService.get("user/working-schedule/get-shifts");
        this.shiftOptions = res.data.data;
        localStorage.setItem("shiftOptions", JSON.stringify(this.shiftOptions));
      } catch (error) {
        console.log(error);
      }
    },
    async getWorkTypes() {
      try {
        const res = await PersonService.get(
          "user/working-schedule/get-worktypes"
        );
        this.workType = res.data.data;
        localStorage.setItem("workType", JSON.stringify(this.workType));
      } catch (error) {
        console.log(error);
      }
    },
    async handleClickTag(tag) {
      this.selectedOpen = true;
      this.selectedEventId = tag.id;
      try {
        const res = await PersonService.get(
          `/user/working-schedule/detail?scheduleId=${tag.id}`
        );
        if (res.status === 200) {
          const data = res.data.data;
          this.form.setFieldsValue({
            description: data.description,
            endTime: data.endTime,
            scheduleId: data.scheduleId,
            shiftId: data.shiftId,
            startTime: data.startTime,
            title: data.title,
            workDate: data.workDate,
            workTypeId: data.workTypeId,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteEvent() {
      const res = await PersonService.delete(
        `user/working-schedule/delete?scheduleId=${this.selectedEventId}`
      );
      if (res.data.code === 200) {
        alert("Delete was successfully!");
        this.selectedOpen = false;
        this.getUserSchedule();
      } else {
        alert(`Error ${res.data.message}`);
      }
    },
    async handleUpdateEvent(e) {
      e.preventDefault();
      let payload = {};

      this.form.validateFieldsAndScroll((err, values) => {
        payload = {
          ...values,
          scheduleId: this.selectedEventId,
        };
      });

      try {
        const res = await PersonService.put(
          "user/working-schedule/update",
          payload
        );
        if (res.data.code === 200) {
          alert("Update Successful!");
          this.selectedOpen = false;
          this.getUserSchedule();
        }
      } catch (error) {
        alert("Can not update the schedule in the past!");
      }
    },
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
      console.log(1111111111111, tagName);
      if (tagName === "Work At Company") {
        return "red";
      }
      if (tagName === "Go On Bussiness") {
        return "Blue";
      }
      if (tagName === "Work at Home") {
        return "Green";
      }
      if (tagName === "Leave") {
        return "Purple";
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

    async getUserSchedule() {
      let url = `working-schedule?endDate=${this.datePicker.endDate}&startDate=${this.datePicker.startDate}`;
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
