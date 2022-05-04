<template>
    <div class="cube-base-layout">
        <div class="cube-base-layout__nav-wrap">
            <div class="cube-nav">
                <div class="cube-nav__logo"></div>
                <div class="cube-nav__gmenu">
                </div>
                <ul class="cube-nav__menu">
                    <li v-for="item in navs" :key="item.key">
                        <span :style="{ color: currentNavKey === item.key ? '#fff' : '' }">
                            <span v-if="item.children && item.children.length">{{ item.name }}</span>
                            <a v-else :href="item.url">{{ item.name }}</a>
                        </span>
                        <span v-if="item.children && item.children.length" class="icon">
                            <svg width="14px" height="14px" viewBox="0 0 14 14">
                                <g stroke="none" stroke-width="1" fill="none">
                                    <g transform="translate(-376.000000, -25.000000)">
                                        <g transform="translate(-11.000000, -24.000000)">
                                            <g transform="translate(327.000000, 45.000000)">
                                                <g fill="#fff" transform="translate(60.000000, 3.000000)">
                                                    <path
                                                        d="M10.8291,5.62262 C10.6201,5.44262 10.3061,5.46362 10.1251,5.67162 L7.0191,9.24462 L3.8731,5.66962 C3.6901,5.46162 3.3751,5.44262 3.1691,5.62462 C2.9621,5.80662 2.9421,6.12262 3.1241,6.32862 L6.6401,10.34162 C6.6401,10.34162 6.6441,10.34462 6.6461,10.34562 C6.7371,10.44062 6.8631,10.49962 7.0051,10.49962 C7.0081,10.49962 7.0101,10.49762 7.0131,10.49762 C7.0161,10.49762 7.0181,10.49962 7.0211,10.49962 C7.0861,10.49962 7.1491,10.48462 7.2101,10.45962 C7.2291,10.45162 7.3251,10.39862 7.3511,10.37462 C7.3601,10.36762 7.3911,10.33662 7.3971,10.32862 L10.8771,6.32662 C11.0581,6.11862 11.0361,5.80362 10.8291,5.62262">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <ul v-if="item.children && item.children.length" class="hover-menu">
                            <li v-for="(citem, cindex) in item.children" :key="cindex">
                                <a :href="citem.url">{{ citem.name }}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="cube-nav__user"></div>
            </div>
        </div>
        <div class="cube-base-layout__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        navs: {
            type: Array,
        },
        currentNavKey: {
            type: String,
        },
    },
    setup() {


        return {}
    }
}
</script>

<style lang="less" scoped>
.cube-base-layout {
    padding-top: 64px;

    &__nav-wrap {
        height: 64px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;

        .cube-nav {
            height: 64px;
            background-color: #1BBC9B;
            padding: 0 40px;
            display: flex;
            align-items: center;

            &__logo {
                width: 100px;
                height: 30px;
                background-color: #fff;
            }

            &__gmenu {
                width: 16px;
                height: 16px;
                background-color: #fff;
                margin: 0 40px 0 32px;
            }

            &__menu {
                flex: 1;
                display: flex;

                &>li {
                    margin-left: 32px;
                    font-size: 14px;
                    height: 64px;
                    line-height: 64px;
                    font-weight: 400;
                    color: #bbebe1;
                    cursor: pointer;
                    position: relative;

                    .icon {
                        position: relative;
                        top: 2px;
                        margin-left: 2px;
                    }

                    .hover-menu {
                        position: absolute;
                        top: 64px;
                        left: -8px;
                        box-sizing: border-box;
                        width: 100px;
                        background-color: #FFFFFF;
                        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
                        border-radius: 4px;
                        padding: 6px 16px 6px 8px;
                        visibility: hidden;
                        opacity: 0;
                        transition: all 0.2s;

                        &>li {
                            height: 22px;
                            font-size: 14px;
                            font-weight: 400;
                            color: #333333;
                            line-height: 22px;
                            margin-bottom: 10px;

                            &:last-child {
                                margin-bottom: 0;
                            }

                            &:hover {
                                a {
                                    color: #1BBC9B;
                                }
                            }
                        }
                    }

                    &:hover {
                        .hover-menu {
                            visibility: visible;
                            opacity: 1;
                        }
                    }
                }
            }

            &__user {
                width: 80px;
                height: 24px;
                margin-left: 16px;
                background-color: #fff;
            }
        }
    }

    &__content {
        min-height: calc(100vh - 64px);
    }
}
</style>