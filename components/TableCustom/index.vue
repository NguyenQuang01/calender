<template>
  <div>
    <div class="toolbar">
      <div class="date-range">
        <span>{{ $moment(this.startDate).format("DD/MM/YYYY") }}</span>
        -
        <span>{{
          $moment(this.startDate).add(7, "days").format("DD/MM/YYYY")
        }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" color="success">Duyệt Cho Tất Cả</v-btn>
      <a-week-picker 
        :allowClear="true"
        :defaultValue="startDate"
        @change="onChange"
      />
    </div>
    <!-- -------------------table----------------------- -->
    <a-table bordered :data-source="dataSource" :columns="columns">
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
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
      startDate: "",
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit("change", this.value);
    },
    edit() {
      this.editable = true;
    },
  },
};
export default {
  name: "TableCustom",
  components: {
    EditableCell,
  },
  data() {
    return {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          avatar: '',
          monday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
            {
              id: 2,
              startTime: "6PM",
              endTime: "5PM",
              shiftName: "allday",
            },
            {
              id: 2,
              startTime: "7PM",
              endTime: "9PM",
              shiftName: "evening",
            },
          ],
          tuesday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          wednesday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          thursday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          friday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          saturday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          sunday:[
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
        },
        {
          key: "1",
          name: "Edward King 1",
          monday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
            {
              id: 2,
              startTime: "6PM",
              endTime: "5PM",
              shiftName: "allday",
            },
            {
              id: 2,
              startTime: "7PM",
              endTime: "9PM",
              shiftName: "evening",
            },
          ],
          tuesday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          wednesday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          thursday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          friday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          saturday: [
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
          sunday:[
            {
              id: 1,
              startTime: "6AM",
              endTime: "11AM",
              shiftName: "morning",
            },
            {
              id: 2,
              startTime: "1PM",
              endTime: "5PM",
              shiftName: "afternoon",
            },
          ],
        
        },
      ],
      count: 2,
      columns: [
        {
          title: "Nhân Viên",
          dataIndex: "name",
          width: "30%",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" },
        },
        {
          title: "Thứ 2",
          dataIndex: "monday",
          key: "monday",
          width: "10%",
          scopedSlots: { customRender: "monday" },
        },
        {
          title: "Thứ 3",
          dataIndex: "tuesday",
          key: "tuesday",
          width: "10%",
          scopedSlots: { customRender: "tuesday" },
        },
        {
          title: "Thứ 4",
          dataIndex: "wednesday",
          key: "wednesday",
          width: "10%",
          scopedSlots: { customRender: "wednesday" },
        },
        {
          title: "Thứ 5",
          dataIndex: "thursday",
          key: "thursday",
          width: "10%",
          scopedSlots: { customRender: "thursday" },
        },
        {
          title: "Thứ 6",
          dataIndex: "friday",
          key: "friday",
          width: "10%",
          scopedSlots: { customRender: "friday" },
        },
        {
          title: "Thứ 7",
          dataIndex: "saturday",
          key: "saturday",
          width: "10%",
          scopedSlots: { customRender: "saturday" },
        },
        {
          title: "Chủ Nhật",
          dataIndex: "sunday",
          key: "sunday",
          width: "10%",
          scopedSlots: { customRender: "sunday" },
        },
      ],
    };
  },
  watch: {
    startDate: {
      handler(value) {
        console.log("11111 ~ file: index.vue:125 ~ value:", value);
      },
      deep: true,
    },
  },
  methods: {
    colorTag(tagName){
      if (tagName === 'morning') {
        return '#673ab7'
      }
      if (tagName === 'afternoon'){
        return '#ff9800'
      }
      if (tagName === "evening") {
        return '#0b91ff'
      }
      if (tagName === "allday") {
        return 'greenyellow'
      }
    },
    onChange(date, dateString) {
      this.startDate = dateString;
      console.log("11111 ~ file: index.vue:120 ~ dateString:", dateString);
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
