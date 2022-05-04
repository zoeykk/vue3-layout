<template>
    <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
        <div class="cube-updown-layout">
            <slot></slot>
        </div>
    </BaseLayout>
</template>

<script>
import BaseLayout from '../BaseLayout'
export default {
    components: {
        BaseLayout,
    },
    props: {
        navs: {
            type: Array,
        },
        currentNavKey: {
            type: String
        },
    },
}
</script>

<style lang="less" scoped>
.cube-updown-layout {
    width: 1200px;
    margin: 0 auto;
}
</style>