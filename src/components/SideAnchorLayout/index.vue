<template>
    <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
        <div class="content">
            <div class="left" ref="pageContentRef">
                <slot></slot>
            </div>
            <div class="right" :style="{ width: anchorWidth }">
                <div class="right-inner" :style="{ width: anchorWidth }">
                    <ul class="cube-anchor">
                        <li v-for="item in anchors" :key="item.href" class="anchor-item"
                            :style="{ color: item.href === hoverAnchor || item.href === activeAnchor ? themeColor : '#333' }"
                            @click="onAnchorClick(item)" @mouseover="onAnchorOver(item)"
                            @mouseleave="onAnchorLeave(item)">
                            <span class="circle"
                                :style="{ color: item.href === activeAnchor ? themeColor : '#ddd' }"></span>
                            {{ item.title }}
                        </li>
                        <div class="line"></div>
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
        }
    },
    setup(props) {
        const hrefTop = {}
        const pageContentRef = ref(null)
        const activeAnchor = ref('')
        const hoverAnchor = ref('')
        onMounted(() => {
            if (props.anchors && props.anchors[0] && props.anchors[0].href) {
                activeAnchor.value = props.anchors[0].href
            }
            const containerNode = pageContentRef.value
            const length = containerNode.children.length
            const INIT_OFFSETTOP = 88 // 对应滚动 scrollTop = 0
            for (let i = 0; i < length; i++) {
                hrefTop[containerNode.children[i].id] = containerNode.children[i].offsetTop - INIT_OFFSETTOP
            }
        })
        // debounce toggle anchor state when scrolling
        let timeoutId = null;
        watch(useScroll(), (val) => {
            for (let href in hrefTop) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    if (val >= hrefTop[href]) {
                        activeAnchor.value = href
                    }
                }, 200);
            }
        })
        function onAnchorClick(item) {
            activeAnchor.value = item.href
            window.scrollTo({
                top: hrefTop[item.href], behavior: "smooth"
            })
        }
        function onAnchorOver(item) {
            hoverAnchor.value = item.href
        }
        function onAnchorLeave(item) {
            hoverAnchor.value = ''
        }
        return { pageContentRef, activeAnchor, hoverAnchor, onAnchorClick, onAnchorOver, onAnchorLeave }
    }
}
</script>

<style lang="less" scoped>
.content {
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

        .cube-anchor {
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

            .line {
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