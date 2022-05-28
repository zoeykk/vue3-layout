<template>
    <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
        <div class="sideanchor-layout">
            <div class="left" ref="blockParentRef">
                <slot></slot>
            </div>
            <div class="right" :style="{ width: anchorWidth }">
                <div class="right-inner" :style="{ width: anchorWidth }">
                    <ul class="anchor">
                        <li v-for="item in anchors" :key="item.href" class="anchor-item"
                            :style="{ color: item.href === hoverAnchor || item.href === activeAnchor ? themeColor : '#333' }"
                            @click="onAnchorClick(item)" @mouseover="onAnchorMouseOver(item)"
                            @mouseleave="onAnchorMouseLeave(item)">
                            <span class="circle"
                                :style="{ color: item.href === activeAnchor ? themeColor : '#ddd' }"></span>
                            {{ item.title }}
                        </li>
                        <div class="circle-line"></div>
                    </ul>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import BaseLayout from '@/components/BaseLayout'
import useScroll from '@/hooks/useScroll.js'

export default {
    components: {
        BaseLayout,
    },
    props: {
        navs: {
            type: Array
        },
        currentNavKey: {
            type: String
        },
        anchors: {
            type: Array
        },
        themeColor: {
            type: String,
            default: '#1BBC9B'
        },
        anchorWidth: {
            type: String,
            default: '160px'
        },
        initTop: {
            type: Number,
            default: 88
        }
    },
    setup(props) {
        const blockParentRef = ref(null);
        const activeAnchor = ref("");
        const hoverAnchor = ref("");
        const isScrollLock = ref(false)
        onMounted(() => {
            init()
        });
        watch(useScroll(), (windowScrollTop) => {
            if (isScrollLock.value) return
            setActiveAnchorByScroll(windowScrollTop)
        });
        function init() {
            if (props.anchors && props.anchors[0] && props.anchors[0].href) {
                activeAnchor.value = props.anchors[0].href;
            }
            scrollTo(0)
        }
        function getBlocksOffsetTop() {
            const blockOffsetTopMap = {};
            const containerNodes = blockParentRef.value.children;
            const nodes = Array.from(containerNodes).reverse()
            for (let i = 0; i < nodes.length; i++) {
                blockOffsetTopMap[nodes[i].id] =
                    nodes[i].offsetTop - props.initTop;
            }
            return blockOffsetTopMap
        }
        function setActiveAnchorByScroll(windowScrollTop) {
            const blockOffsetTopMap = getBlocksOffsetTop()
            for (let key in blockOffsetTopMap) {
                if (windowScrollTop >= blockOffsetTopMap[key]) {
                    activeAnchor.value = key;
                    break
                }
            }
        }
        function scrollTo(offsetTop) {
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
        function onAnchorClick(item) {
            isScrollLock.value = true
            activeAnchor.value = item.href;
            const blockOffsetTopMap = getBlocksOffsetTop()
            scrollTo(blockOffsetTopMap[item.href])
            setTimeout(() => {
                isScrollLock.value = false
            }, 800);
        }
        function onAnchorMouseOver(item) {
            hoverAnchor.value = item.href;
        }
        function onAnchorMouseLeave() {
            hoverAnchor.value = "";
        }
        return {
            isScrollLock,
            blockParentRef,
            activeAnchor,
            hoverAnchor,
            onAnchorClick,
            onAnchorMouseOver,
            onAnchorMouseLeave,
        };
    }
}
</script>

<style lang="less" scoped>
.sideanchor-layout {
    display: flex;
    align-items: flex-start;
    padding: 24px;

    .left {
        flex: 1;
    }

    .right {
        width: 160px;
        margin-left: 24px;

        .right-inner {
            position: fixed;
            top: 86px;
            width: 160px;
        }

        .anchor {
            background-color: #FFF;
            border-radius: 4px;
            padding: 16px;
            position: relative;
            z-index: 1;

            .anchor-item {
                height: 22px;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.3s;

                &:last-child {
                    margin-bottom: 0;
                }

                .circle {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    background: #FFFFFF;
                    border-width: 2px;
                    border-style: solid;
                    border-radius: 50%;
                    margin-right: 8px;
                }

            }

            .circle-line {
                position: absolute;
                top: 16px;
                bottom: 16px;
                left: 21px;
                width: 0;
                border-left: 1px solid #eee;
                z-index: -1;
                transform: translate(-50%);
            }

        }

    }
}
</style>