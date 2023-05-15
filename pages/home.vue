<template>
  <v-row class="fill-height">
    <v-col cols="3" class="inf_all">
      <div>
        <div class="avatar">
          <v-avatar color="teal" size="56"></v-avatar>
        </div>

        <div class="Name">Nguyễn Trung Quang</div>
        <div>
          <a-button type="primary" @click="showModal"> Create new </a-button>

          <a-modal v-model="visible" title="Create new calendar" @ok="handleOk">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Title"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="StartTime"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="EndTime"
                required
              ></v-text-field>
              <!-- <v-select
                v-model="select"
                :items="items"
                :rules="[(v) => !!v || 'Item is required']"
                label="EndTime"
                required
              ></v-select> -->

              <!-- <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Validate
              </v-btn> -->
            </v-form>
          </a-modal>
        </div>
        <div class="inf">
          Lets find a time meet about our upcoming co-promotion
        </div>
        <div class="network">
          <div><v-icon>mdi-account-circle </v-icon> derrick Reimer</div>
          <div><v-icon>mdi-clock-time-four-outline </v-icon> 60 Minutes</div>
          <div><v-icon>mdi-map-marker </v-icon> Zoom</div>
        </div>
        <div class="day">
          <v-date-picker v-model="picker"></v-date-picker>
        </div>
      </div>
    </v-col>
    <v-col cols="9">
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn
            variant="outlined"
            class="me-4"
            color="grey-darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            variant="text"
            size="small"
            color="grey-darken-2"
            @click="prev"
          >
            <v-icon size="small"> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
            fab
            variant="text"
            size="small"
            color="grey-darken-2"
            @click="next"
          >
            <v-icon size="small"> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu location="bottom end">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                variant="outlined"
                color="grey-darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon end> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    ModalText: "Content of the modal",
    visible: false,
    focus: "",
    type: "week",
    typeToLabel: {
      month: "Month",
      week: "Week",
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.form.validate();

      // this.ModalText = "The modal will be closed after two seconds";
      // setTimeout(() => {
      // this.visible = false;
      //   this.confirmLoading = false;
      // }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
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
      this.events = [
        {
          name: "Meeting",
          start: "2023-05-10 04:30",
          end: "2023-05-10 6:15",
          color: "deep-purple",
          timed: true,
        },
        {
          name: "Green",
          start: "2023-05-10 02:30",
          end: "2023-05-10 3:15",
          color: "green",
          timed: true,
        },
        {
          name: "Green",
          start: "2023-05-11 01:30",
          end: "2023-05-11 2:15",
          color: "cyan ",
          timed: true,
        },
        {
          name: "Meeting",
          start: "2023-05-15 04:30",
          end: "2023-05-15 6:15",
          color: "deep-purple",
          timed: true,
        },
        {
          name: "Green",
          start: "2023-05-16 02:30",
          end: "2023-05-16 3:15",
          color: "green",
          timed: true,
        },
        {
          name: "Green",
          start: "2023-05-17 01:30",
          end: "2023-05-17 2:15",
          color: "cyan ",
          timed: true,
        },
      ];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
<style scoped>
.mr-20 {
  margin-right: 10px;
}
.inf_all {
  margin-top: 20px;
}
.Name {
  margin: 5px 0;
  font-size: 18px;
  font-weight: 700;
}
.network {
  margin: 10px 0;
}
.fill-height {
  margin-top: 20px;
  margin-left: 20px;
}
.v-sheet {
  margin-bottom: 5px;
}
.v-toolbar__title {
  margin-left: 10px;
}
</style>
