<template>
  <div class="shift" :style="cardStyles">
    <span>{{ startTime }} </span>
    -
    <span>{{ endTime }}</span>
  </div>
</template>
<script>
export default {
  name: 'ShiftCard',
  props: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
      default: null,
    },
    color: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    cardStyles() {
      return {
        "background-color": color,
      };
    }
  }
};
</script>
