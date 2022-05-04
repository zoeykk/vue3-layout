<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { provide, ref } from 'vue'
export default {
    setup() {
        const selectedKey = ref('')
        function changeSelectedKey(key) {
            selectedKey.value = key
        }
        provide('selectedKey', selectedKey)
        provide('changeSelectedKey', changeSelectedKey)
    }
};
</script>

<style lang="less" scoped>
</style>