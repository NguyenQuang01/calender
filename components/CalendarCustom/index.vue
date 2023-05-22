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
        ></v-calendar>
        <!-- modal events -->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent?.color?.toLowerCase()" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
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
                <div class="select-type">
                  <div class="popup-box">
                    <input
                      :value="selectedEvent.name"
                      class="popup-input"
                      type="text"
                      placeholder="Enter work title"
                    />
                    <CustomSelect :options="shiftOptions" />
                    <CustomSelect :options="workType" />
                  </div>
                  <div class="popup-box">
                    <input
                      :value="selectedEvent.start?.split(' ')[0]"
                      class="popup-input"
                      type="text"
                      placeholder="Enter Date..."
                    />
                    <input
                      :value="selectedEvent.start?.split(' ')[1]"
                      class="popup-input"
                      type="text"
                      placeholder="Enter Start Time..."
                    />
                    <input
                      :value="selectedEvent.end?.split(' ')[1]"
                      class="popup-input"
                      type="text"
                      placeholder="Enter End Time..."
                    />
                  </div>
                </div>
                <textarea
                  :value="selectedEvent?.description"
                  style="
                    margin-top: 12px;
                    border: 1px solid black;
                    border-radius: 4px;
                    width: 100%;
                  "
                  id="textarea"
                  rows="2"
                ></textarea>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Save
              </v-btn>
              <v-spacer />
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
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
    currentMonth: new Date().getMonth()
  }),
  beforeMount() {
    this.getFirstDateAndLastDate();
  },
  // mounted() {
  //   this.$refs.calendar.checkChange();
  // },
  fetch() {
    Promise.all([
      this.getListShifts(),
      this.getWorkTypes(),
      this.getListEvents(),
    ]);
  },
  watch: {
    currentMonth: {
      handler(){
        this.getFirstDateAndLastDate();
      }
    },
    dateRange: {
      handler(){
        this.getListEvents();
      },
      deep: true
    }
  },
  methods: {
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
      console.log(1111111, date, dateString);
    },
    getDay(date) {
      const day = new Date(date.date).getDay();
      return this.daysOfWeek[day];
    },
    // viewDay({ date }) {
    //   this.focus = date;
    //   this.type = "day";
    // },
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
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
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
</style>
