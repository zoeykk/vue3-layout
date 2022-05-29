<template>
    <BaseLayout :navs="navs" currentNavKey="1-1">
        <div class="cube-updown-layout">
            <div class="breadcrumb">
                一级项/二级项/选中项
            </div>
            <div class="content">固定宽度1200px</div>
        </div>
    </BaseLayout>
</template>

<script>
import { reactive, toRefs } from 'vue'
import BaseLayout from '@/components/BaseLayout'
import { NAVS } from '../../config'
export default {
    components: {
        BaseLayout,
    },
    setup() {
        const data = reactive({ navs: NAVS })
        return { ...toRefs(data) }
    }
}
</script>

<style lang="less" scoped>
.cube-updown-layout {
    padding: 0 24px 0 24px;
    width: 1200px;
    margin: 0 auto;

    .breadcrumb {
        padding: 16px 0 20px 0;
        font-size: 14px;
        color: #999;
        line-height: 22px;
    }

    .content {
        background-color: #fff;
        min-height: calc(100vh - 140px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>