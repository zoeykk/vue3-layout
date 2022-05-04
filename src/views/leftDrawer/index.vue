<template>
    <DrawerLayout :navs="navs" currentNavKey="2" :menus="menus" @menuClick="onMenuClick">
        <template #drawer>
            <ul class="custome-drawer">
                <li>医药魔方</li>
                <li>医药魔方</li>
            </ul>
        </template>
        <div class="content">
            <div class="content__title">医药魔方</div>
            <div class="content__body">医药魔方是一个医药行业一站式大数据服务平台，公司专注于为医药企业和投资机构提供专业数据、媒体资讯和咨询服务，致力于数据赋能医药创新，助力客户更加成功。</div>
        </div>
    </DrawerLayout>
</template>

<script>
import { reactive, toRefs } from 'vue'
import DrawerLayout from '@/components/DrawerLayout'
export default {
    components: {
        DrawerLayout,
    },
    setup() {
        const data = reactive(
            {
                navs: [{
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
                    name: "已选中项",
                    key: '3',
                    url: "https://www.baidu.com/",
                }],
                menus: [{
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
.custome-drawer {
    padding: 24px;
    background-color: antiquewhite;
}

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