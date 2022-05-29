<template>
    <MenuLayout :navs="navs" currentNavKey="0-0" :menus="menus" @menuClick="onMenuClick">
        <div class="content">
            <div class="content__title">医药魔方</div>
            <div class="content__body">医药魔方是一个医药行业一站式大数据服务平台，公司专注于为医药企业和投资机构提供专业数据、媒体资讯和咨询服务，致力于数据赋能医药创新，助力客户更加成功。</div>
        </div>
    </MenuLayout>
</template>

<script>
import { reactive, toRefs } from 'vue'
import MenuLayout from '@/components/MenuLayout'
import { NAVS } from '../../config'
export default {
    components: {
        MenuLayout,
    },
    setup() {
        const data = reactive(
            {
                navs: NAVS,
                menus: [{
                    name: "锚点布局",
                    key: '1',
                    children: [{
                        name: '左右',
                        key: '10',
                        url: "https://www.baidu.com/"
                    }, {
                        name: '上下',
                        key: '11',
                        url: "https://www.baidu.com/"
                    }]
                }, {
                    name: "已选中项",
                    key: '3',
                    url: "https://www.baidu.com/",
                }]
            }
        )


        function onMenuClick(item) {
            console.log(item);
        }

        return { ...toRefs(data), onMenuClick }
    }
}
</script>

<style lang="less" scoped>
.content {
    font-size: 14px;

    &__title {
        height: 54px;
        line-height: 54px;
        background-color: #FFFFFF;
        font-weight: 500;
        color: #333333;
        padding: 0 24px;
    }

    &__body {
        border-radius: 4px;
        margin: 24px;
        background-color: #fff;
        min-height: 800px;
        padding: 24px;
        font-weight: 400;
    }
}
</style>