<template>
    <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
        <div class="cube-menu-layout">
            <div class="cube-menu-layout__menu" :style="{ width: menuVisible ? '200px' : '64px' }">
                <div class="menu-fix">
                    <div class="menu-collapse" @click="onMenuCollapse">
                        <svg width="16px" height="16px" viewBox="0 0 16 16">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-24.000000, -88.000000)" fill="#666666">
                                    <g transform="translate(0.000000, 76.000000)">
                                        <g transform="translate(24.000000, 12.000000)">
                                            <path
                                                d="M14.5,13.5 C14.7761424,13.5 15,13.7238576 15,14 C15,14.2761424 14.7761424,14.5 14.5,14.5 L1.5,14.5 C1.22385763,14.5 1,14.2761424 1,14 C1,13.7238576 1.22385763,13.5 1.5,13.5 L14.5,13.5 Z M1.25,5.25 C1.30409255,5.25 1.35672596,5.26754447 1.4,5.3 L4.73333333,7.8 C4.84379028,7.88284271 4.86617605,8.03954305 4.78333333,8.15 C4.76911977,8.16895142 4.75228475,8.18578644 4.73333333,8.2 L1.4,10.7 C1.28954305,10.7828427 1.13284271,10.7604569 1.05,10.65 C1.01754447,10.606726 1,10.5540926 1,10.5 L1,5.5 C1,5.36192881 1.11192881,5.25 1.25,5.25 Z M14.5,9.5 C14.7761424,9.5 15,9.72385763 15,10 C15,10.2761424 14.7761424,10.5 14.5,10.5 L7.5,10.5 C7.22385763,10.5 7,10.2761424 7,10 C7,9.72385763 7.22385763,9.5 7.5,9.5 L14.5,9.5 Z M14.5,5.5 C14.7761424,5.5 15,5.72385763 15,6 C15,6.27614237 14.7761424,6.5 14.5,6.5 L7.5,6.5 C7.22385763,6.5 7,6.27614237 7,6 C7,5.72385763 7.22385763,5.5 7.5,5.5 L14.5,5.5 Z M14.5,1.5 C14.7761424,1.5 15,1.72385763 15,2 C15,2.27614237 14.7761424,2.5 14.5,2.5 L1.5,2.5 C1.22385763,2.5 1,2.27614237 1,2 C1,1.72385763 1.22385763,1.5 1.5,1.5 L14.5,1.5 Z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span v-show="menuVisible"> 收起导航</span>
                    </div>
                    <CubeMenu v-show="menuVisible">
                        <CubeMenuItem v-for="item in menus" :key="item.key" :item="item" @menuClick="onMenuClick(item)">
                            <template #icon>
                                <svg width="16px" height="16px" viewBox="0 0 16 16">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g transform="translate(-16.000000, -88.000000)">
                                            <g transform="translate(0.000000, 76.000000)">
                                                <g transform="translate(16.000000, 12.000000)">
                                                    <path
                                                        d="M6.8184656,8.01188863 L1.95490841,5.46625894 C1.52423214,5.23290955 1.00952148,5.57232684 1.00952148,6.10266636 L1.00952148,11.0666443 C1.00952148,11.586377 1.27212896,12.0530758 1.70280523,12.2864252 L6.56636242,14.8320549 C6.99703868,15.0654042 7.51174934,14.7153802 7.51174934,14.1850406 L7.51174934,9.23166953 C7.51174934,8.7119368 7.24914186,8.24523802 6.8184656,8.01188863 Z M9.17138521,8.01188863 L14.0349424,5.46625894 C14.4656187,5.23290955 14.9803293,5.57232684 14.9803293,6.10266636 L14.9803293,11.0666443 C14.9803293,11.586377 14.7177218,12.0530758 14.2870456,12.2864252 L9.42348839,14.8320549 C8.99281212,15.0654042 8.47810146,14.7153802 8.47810146,14.1850406 L8.47810146,9.23166953 C8.47810146,8.7119368 8.74070894,8.24523802 9.17138521,8.01188863 Z M13.4562375,4.70575046 C13.6768278,4.58907577 13.7818708,4.38754675 13.7608622,4.19662452 C13.7818708,3.9950955 13.6768278,3.80417328 13.4562375,3.68749858 L8.70829426,1.18429605 C8.49820828,1.06762135 8.2461051,1.0145874 7.99400192,1.0145874 C7.74189874,1.0145874 7.48979556,1.06762135 7.27970958,1.18429605 L2.53176635,3.67689179 C2.31117607,3.79356649 2.21663738,3.9950955 2.22714168,4.18601773 C2.21663738,4.38754675 2.31117607,4.58907577 2.53176635,4.70575046 L7.27970958,7.19834621 C7.48979556,7.3150209 7.74189874,7.36805485 7.99400192,7.36805485 C8.2461051,7.36805485 8.49820828,7.3150209 8.70829426,7.19834621 L13.4562375,4.70575046 Z"
                                                        fill="#1BBC9B">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </template>
                        </CubeMenuItem>
                    </CubeMenu>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import { ref, computed } from 'vue'
import BaseLayout from '../BaseLayout'
import CubeMenu from '../CubeMenu/CubeMenu.vue'
import CubeMenuItem from '../CubeMenu/CubeMenuItem.vue'

export default {
    props: {
        navs: {
            type: Array,
        },
        currentNavKey: {
            type: String
        },
        menus: {
            type: Array,
        },
    },
    components: {
        BaseLayout,
        CubeMenu,
        CubeMenuItem,
    },
    setup(props, { emit }) {
        const menuVisible = ref(true)

        function onMenuCollapse() {
            menuVisible.value = !menuVisible.value
        }
        function onMenuClick(item) {
            emit('menuClick', item)
        }

        return { menuVisible, onMenuClick, onMenuCollapse }
    }
}
</script>

<style lang="less" scoped>
.cube-menu-layout {
    display: flex;
    font-size: 14px;

    .cube-menu-layout__menu {
        box-sizing: border-box;
        transition: width 0.2s;
        background-color: #fff;
        border-right: 1px solid #eee;
        min-height: calc(100vh - 64px);

        .menu-fix {
            width: 200px;
            min-height: calc(100vh - 64px);
            position: fixed;
            top: 64px;
            left: 0;
            padding-top: 12px;

            .menu-collapse {
                height: 40px;
                line-height: 40px;
                padding: 0 16px;
                cursor: pointer;
            }
        }
    }
}
</style>