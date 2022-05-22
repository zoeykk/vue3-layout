<template>
    <UpDownLayout :navs="navs" currentNavKey="2">
        <div class="content">
            <div class="breadcrumb">
                一级项/二级项/选中项
            </div>
            <div class="content-body">固定宽度1200px</div>
        </div>
    </UpDownLayout>
</template>

<script>
import { reactive, computed } from 'vue'
import UpDownLayout from '@/components/UpDownLayout'
export default {
    components: {
        UpDownLayout,
    },
    setup() {
        const navs = reactive([{
            name: "未选中项1",
            key: '1',
            children: [{
                name: '选项一',
                key: '10',
                url: "https://www.baidu.com/"
            }, {
                name: '选项二',
                key: '11',
                url: "https://www.baidu.com/"
            }, {
                name: '选项三',
                key: '12',
                url: "https://www.baidu.com/"
            }]
        }, {
            name: "未选中项2",
            key: '2',
            children: [{
                name: '选项一',
                key: '20',
                url: "https://www.baidu.com/"
            }, {
                name: '选项二',
                key: '21',
                url: "https://www.baidu.com/"
            }]
        }, {
            name: "已选中项",
            key: '3',
            url: "https://www.baidu.com/",
        }])
        return { navs }
    }
}
</script>

<style lang="less" scoped>
.content {
    .breadcrumb {
        margin: 16px 0 20px 0;
        height: 22px;
        font-size: 14px;
        color: #999;
        line-height: 22px;
    }

    .content-body {
        background-color: #fff;
        min-height: calc(100vh - 300px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>