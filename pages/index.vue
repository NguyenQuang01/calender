<template>
  <v-row class="fill-height">
    <v-col cols="3" class="inf_all">
      <div>
        <div>
          <a-form :form="form" @submit="handleSubmit">
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
              <a-input v-decorator="['description']" />
            </a-form-item>
            <a-form-item label="Work Date">
              <a-date-picker v-decorator="['workDate', config]" />
            </a-form-item>
            <a-form-item label="Start Time">
              <a-time-picker
                v-decorator="['startTime', config]"
                format="HH:mm"
              />
            </a-form-item>
            <a-form-item label="End Time">
              <a-time-picker
                v-decorator="['endTime', config]"
                format="HH:mm"
              />
            </a-form-item>
            <a-form-item label="Shift">
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
            <a-form-item label="Work Type">
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
            <a-form-item>
              <a-button type="primary" html-type="submit"> Create </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </v-col>
    <v-col cols="9">
      <CalendarCustom />
    </v-col>
  </v-row>
</template>

<script>
import CalendarCustom from "~/components/CalendarCustom";
import PersonService from "../services/api/personService";
export default {
  components: {
    CalendarCustom,
  },

  data: () => ({
    visible: false,
    config: {
      rules: [
        { type: "object", required: true, message: "Please select time!" },
      ],
    },
    shiftOptions: [],
    workType: [],
    dataCreate: {},
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  mounted() {
    this.shiftOptions = JSON.parse(localStorage.getItem("shiftOptions"));
    this.workType = JSON.parse(localStorage.getItem("workType"));
  },

  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const fromCreate = {
            ...values,
            workDate: this.$moment(values.workDate).format("YYYY-MM-DD"),
            startTime: this.$moment(values.startTime).format("HH:mm"),
            endTime: this.$moment(values.endTime).format("HH:mm"),
          };
          this.dataCreate = fromCreate
        }
      });
      const res = await PersonService.post("user/working-schedule/add", this.dataCreate);
      if (res.data.message === "Successfully") {
        this.form.resetFields()
        alert(`Add ${res.data.message}`)
      } else {
        alert(res.data.message)
      }
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
