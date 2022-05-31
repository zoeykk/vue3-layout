<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { provide, ref } from "vue";
export default {
  //   props: {
  //     openKeys: {
  //       type: Array,
  //       default: [],
  //     },
  //   },
  setup(props) {
    const openKeys = ref([]);
    const selectedKey = ref("");
    function changeSelectedKey(key) {
      selectedKey.value = key;
    }
    function openChange(key) {
      if (openKeys.value.includes(key)) {
        openKeys.value = openKeys.value.filter((item) => item !== key);
      } else {
        openKeys.value.push(key);
      }
    }
    provide("openKeys", openKeys);
    provide("openChange", openChange);
    provide("selectedKey", selectedKey);
    provide("changeSelectedKey", changeSelectedKey);
  },
};
</script>

<style lang="less" scoped>
</style>