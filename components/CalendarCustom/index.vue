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
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <!-- modal events -->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!--eslint-disable vue/no-v-text-v-html-on-component-->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
              <div class="form-events">
                <div class="select-type">
                  <div class="popup-box">
                    <input class="popup-input" type="text" placeholder="Enter work title"/>
                    <CustomSelect :options="shiftOptions"/>
                    <CustomSelect :options="workType" />
                  </div>
                  <div class="popup-box">
                    <input class="popup-input" type="text" placeholder="Enter Date..." />
                    <input class="popup-input" type="number" placeholder="Enter Start Time..." />
                    <input class="popup-input" type="number" placeholder="Enter End Time..." />
                  </div>
                </div>
                <textarea
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
    colors: ["deep-purple", "green", "orange", "blue"],
    names: ["Ca Sáng", "Ca Tối", "Cả Ngày", "Ca Trưa"],
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
    shiftOptions: ['Sang', 'toi'],
    workType: ['full time ']
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
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
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.random(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.random(0, 3) === 0;
        const firstTimestamp = this.random(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.random(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.random(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.random(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    random(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
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
  gap: 4px
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
