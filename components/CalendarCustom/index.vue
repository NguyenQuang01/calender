<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet class="calendar-main">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :weekdays="weekdays"
          :weekday-format="getDay"
          :event-color="getEventColor"
          :type="type"
          :locale-first-day-of-year="1"
          @click:event="showEvent"
          @click:date="viewDay"
          @click:more="viewDay"
        ></v-calendar>
        <!-- modal events -->
        <!-- <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        > -->
        <a-modal :visible="selectedOpen" :footer="null" :closable="false">
          <v-card color="grey lighten-4" flat>
            <v-toolbar :color="selectedEvent?.color?.toLowerCase()" dark>
              <!--eslint-disable vue/no-v-text-v-html-on-component-->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="handleDeleteEvent">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
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
                    <a-button type="primary" html-type="submit">
                      Save
                    </a-button>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                      Cancel
                    </v-btn>
                  </a-form-item>
                </a-form>
              </div>
            </v-card-text>
          </v-card>
        </a-modal>
        <!-- </v-menu> -->
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import PersonService from "../../services/api/personService";

export default {
  name: "CalendarCustom",
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    daysOfWeek: [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ],
    shiftOptions: [],
    workType: [],
    dateRange: {
      startDate: null,
      endDate: null,
    },
    currentMonth: new Date().getMonth(),
    form: {},
  }),
  beforeMount() {
    this.getFirstDateAndLastDate();
    this.form = this.$form.createForm(this, { name: "register" });
  },
  fetch() {
    Promise.all([
      this.getListShifts(),
      this.getWorkTypes(),
      this.getListEvents(),
    ]);
  },
  watch: {
    currentMonth: {
      handler() {
        this.getFirstDateAndLastDate();
      },
    },
    dateRange: {
      handler() {
        this.getListEvents();
      },
      deep: true,
    },
  },
  methods: {
    async handleUpdateEvent(e) {
      e.preventDefault();
      let payload = {};

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          payload = {
            ...values,
            scheduleId: this.selectedEvent.scheduleId,
          };
        }
      });

      try {
        const res = await PersonService.put(
          "user/working-schedule/update",
          payload
        );
        if (res.data.code === 200) {
          alert("Update Successful!");
          this.selectedOpen = false;
          this.getListEvents();
        } else {
          alert(message);
        }
      } catch (error) {
        alert(error.message);
      }
    },
    getFirstDateAndLastDate() {
      const date = new Date();
      const startDate = new Date(date.getFullYear(), this.currentMonth, 1);
      const endDate = new Date(date.getFullYear(), this.currentMonth + 1, 0);

      this.dateRange = {
        startDate: this.$moment(startDate).format("YYYY-MM-DD"),
        endDate: this.$moment(endDate).format("YYYY-MM-DD"),
      };
    },
    async handleDeleteEvent() {
      const res = await PersonService.delete(
        `user/working-schedule/delete?scheduleId=${this.selectedEvent.scheduleId}`
      );
      if (res.data.code === 200) {
        alert("Delete was successfully!");
        this.selectedOpen = false;
        this.getListEvents();
      } else {
        alert(`Error ${res.data.message}`);
      }
    },

    async getListEvents() {
      const url = `user/working-schedule/?endDate=${this.dateRange.endDate}&startDate=${this.dateRange.startDate}`;
      try {
        const res = await PersonService.get(url);
        this.events = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
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

    onChange(date, dateString) {
    },
    getDay(date) {
      const day = new Date(date.date).getDay();
      return this.daysOfWeek[day];
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      const color = event?.color.toLowerCase();
      return color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
      this.currentMonth--;
    },
    next() {
      this.$refs.calendar.next();
      this.currentMonth++;
    },
    showEvent({ nativeEvent, event }) {
      this.selectedEvent = event;
      const open = async () => {
        try {
          const res = await PersonService.get(
            `/user/working-schedule/detail?scheduleId=${event.scheduleId}`
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

        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        // this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>
<style>
.calendar-main {
  height: calc(100% - 64px);
}
.select-type {
  display: flex;
  gap: 4px;
}
.popup-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.popup-input {
  border: 1px solid black;
  border-radius: 4px;
  width: 100%;
  padding: 4px 8px;
}
.ant-modal-body {
  padding: 0 !important;
}
</style>
