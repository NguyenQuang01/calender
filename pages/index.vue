<template>
  <v-row class="fill-height">
    <v-col cols="3" class="inf_all">
      <div>
        <div class="avatar">
          <v-avatar color="teal" size="56"></v-avatar>
        </div>

        <div class="Name">Nguyễn Trung Quang</div>
        <div>
          <a-button type="primary" @click="showModal" style="color: white;"> Create new </a-button>

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
                v-model="startDate"
                label="StartTime"
                required
              ></v-text-field>
              <v-text-field
                v-model="endDate"
                label="EndTime"
                required
              ></v-text-field>
            </v-form>
          </a-modal>
        </div>
        <div class="day" style="margin-top: 10px;">
          <v-date-picker v-model="picker"></v-date-picker>
        </div>
      </div>
    </v-col>
    <v-col cols="9">
      <CalendarCustom />
    </v-col>
  </v-row>
</template>

<script>
import CalendarCustom from '~/components/CalendarCustom'
export default {
  components: {
    CalendarCustom,
  },

  data: () => ({
  }),

  methods: {

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
