<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="prefix-icon">
    </div>
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <v-icon v-if="prefixIcon">{{ prefixIcon }}</v-icon>
     <span> {{ selected }}</span>
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="option of options"
        :key="option.id"
        @click="
          selected = option.name;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    prefixIcon: {
      type: String,
      required: false,
      default: null,
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0].name
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 31px;
  line-height: 30px;
}

.custom-select .selected {
  /* background-color: #0a0a0a; */
  border-radius: 6px;
  border: 1px solid #666666;
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: black transparent transparent transparent;
}

.custom-select .items {
  color: black;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #ad8225;
}

.selectHide {
  display: none;
}
</style>
