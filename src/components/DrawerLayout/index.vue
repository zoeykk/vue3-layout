<template>
    <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
        <div class="cube-drawer-layout">
            <div class="cube-drawer-layout__menu" :style="{ width: menuVisible ? '200px' : '0' }">
                <div v-show="menuVisible" class="menu-fix">
                    <CubeMenu>
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
            <div class="cube-drawer-layout__drawer"
                :style="{ width: drawerVisible ? '240px' : '0', 'border-right': drawerVisible ? '1px solid #eee' : 'none' }">
                <div v-show="drawerVisible" class="drawer-content">
                    <div class="drawer-content__header">
                        <div class="title">等级</div>
                        <div class="close" @click="onDrawerClose">x</div>
                    </div>
                    <slot name="drawer"></slot>
                    <div class="expand-toggle" @click="toggleSiderVisible">
                    </div>
                </div>
            </div>
            <div class="cube-drawer-layout__content">
                <slot></slot>
            </div>
            <div class="cube-collapse-btn" v-show="expandToggleVisible" @click="toggleSiderVisible">
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
        const drawerVisible = ref(false)
        const expandToggleVisible = computed(() => {
            return !menuVisible.value && !drawerVisible.value
        })

        function toggleDrawerVisible(b) {
            drawerVisible.value = b
        }
        function toggleSiderVisible() {
            menuVisible.value = !menuVisible.value
            drawerVisible.value = !drawerVisible.value
        }
        function onMenuClick(item) {
            emit('menuClick', item)
            drawerVisible.value = true
        }
        function onDrawerClose(item) {
            drawerVisible.value = false
        }

        return { menuVisible, drawerVisible, onMenuClick, expandToggleVisible, toggleDrawerVisible, toggleSiderVisible, onDrawerClose }
    }
}
</script>

<style lang="less" scoped>
.cube-drawer-layout {
    display: flex;

    .toggle-btn {
        width: 18px;
        height: 42px;
        background: #FFFFFF;
        box-shadow: inset 0px 1px 0px 0px #EEEEEE, inset -1px 0px 0px 0px #EEEEEE, inset 0px -1px 0px 0px #EEEEEE;
        border-radius: 0px 4px 4px 0px;
        cursor: pointer;
    }

    .cube-drawer-layout__menu {
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
        }
    }

    .cube-drawer-layout__drawer {
        box-sizing: border-box;
        transition: width 0.2s;
        overflow: hidden;
        background-color: #fff;

        .drawer-content {
            width: 240px;
            position: fixed;
            top: 64px;
            left: 200px;
            min-height: calc(100vh - 64px);

            &__header {
                display: flex;
                align-items: center;
                padding: 16px 16px 0 16px;

                .title {
                    flex: 1;
                    font-size: 14px;
                    font-weight: 500;
                    color: #333333;
                }

                .close {
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    cursor: pointer;
                }
            }

            .expand-toggle {
                position: absolute;
                top: 200px;
                right: -18px;
                .toggle-btn();
            }
        }

    }

    .cube-collapse-btn {
        position: fixed;
        top: 264px;
        left: 0;
        .toggle-btn()
    }

    .cube-drawer-layout__content {
        flex: 1;
    }
}
</style>