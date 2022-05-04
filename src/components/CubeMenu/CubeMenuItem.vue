<template>
    <div class="collapse-wrap">
        <div :class="['header', { 'menu-item--active': isMenuActive }]" @click="onMenuClick">
            <div class="icon">
                <slot name="icon"> </slot>
            </div>
            <div class="text">{{ item.name }}</div>
            <div v-show="hasMenuItem" class="arrow">
                <svg width="14px" height="14px" viewBox="0 0 14 14">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g transform="translate(-376.000000, -25.000000)">
                            <g transform="translate(-11.000000, -24.000000)">
                                <g transform="translate(327.000000, 45.000000)">
                                    <g fill="#666666" transform="translate(60.000000, 3.000000)">
                                        <path
                                            d="M10.8291,5.62262 C10.6201,5.44262 10.3061,5.46362 10.1251,5.67162 L7.0191,9.24462 L3.8731,5.66962 C3.6901,5.46162 3.3751,5.44262 3.1691,5.62462 C2.9621,5.80662 2.9421,6.12262 3.1241,6.32862 L6.6401,10.34162 C6.6401,10.34162 6.6441,10.34462 6.6461,10.34562 C6.7371,10.44062 6.8631,10.49962 7.0051,10.49962 C7.0081,10.49962 7.0101,10.49762 7.0131,10.49762 C7.0161,10.49762 7.0181,10.49962 7.0211,10.49962 C7.0861,10.49962 7.1491,10.48462 7.2101,10.45962 C7.2291,10.45162 7.3251,10.39862 7.3511,10.37462 C7.3601,10.36762 7.3911,10.33662 7.3971,10.32862 L10.8771,6.32662 C11.0581,6.11862 11.0361,5.80362 10.8291,5.62262">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <HeightTransition>
            <ul v-show="hasMenuItem && visible" class="body">
                <li :class="[{ 'menu-item--active': citem.key === selectedKey }]" v-for="citem in item.children"
                    :key="citem.key" @click="onMenuItemClick(citem)">{{ citem.name }}</li>
            </ul>
        </HeightTransition>
    </div>
</template>

<script>
import { inject, ref, computed, toRefs } from 'vue'
import HeightTransition from './HeightTransition.vue'
export default {
    components: {
        HeightTransition,
    },
    props: {
        item: {
            type: Object,
        },
    },
    setup(props, { emit }) {
        const visible = ref(false)
        const selectedKey = inject('selectedKey')
        const changeSelectedKey = inject('changeSelectedKey')
        const { item } = toRefs(props)
        const hasMenuItem = computed(() => {
            return Boolean(item.value.children && item.value.children.length > 0)
        })
        const isMenuActive = computed(() => {
            return selectedKey.value === item.value.key
        })
        function onMenuClick() {
            if (hasMenuItem.value) {
                visible.value = !visible.value
            } else {
                emit('menuClick')
                changeSelectedKey(item.value.key)
            }
        }
        function onMenuItemClick(citem) {
            emit('menuClick')
            changeSelectedKey(citem.key)
        }
        return { selectedKey, isMenuActive, visible, hasMenuItem, onMenuClick, onMenuItemClick }
    }
};
</script>

<style lang="less" scoped>
.menu-item--active {
    color: #1BBC9B;
    font-weight: 600;
    background-color: rgba(27, 188, 155, 0.04);
}

.collapse-wrap {
    .header {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 18px 0 16px;
        font-size: 14px;
        cursor: pointer;

        .icon {
            width: 16px;
            margin-top: 3px;
        }

        .text {
            flex: 1;
            margin-left: 12px;
            line-height: 22px;
        }

        .arrow {
            color: #333;
        }

        &:hover {
            background-color: rgba(27, 188, 155, 0.04);
        }
    }

    .body {
        font-size: 14px;
        font-weight: 400;

        li {
            padding-left: 44px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;

            &:hover {
                background-color: rgba(27, 188, 155, 0.04);
            }
        }
    }
}
</style>