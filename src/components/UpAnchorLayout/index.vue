<template>
  <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
    <div class="upanchor-layout">
      <div class="anchor-wrap">
        <ul class="anchor">
          <li
            v-for="item in anchors"
            :key="item.href"
            class="anchor-item"
            :style="{
              color: [hoverAnchor, activeAnchor].includes(item.href)
                ? themeColor
                : '#333',
            }"
            @click="onAnchorClick(item)"
            @mouseover="onAnchorMouseOver(item)"
            @mouseleave="onAnchorMouseLeave(item)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div ref="blockParentRef">
        <slot></slot>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import BaseLayout from "@/components/BaseLayout";
import useScroll from "@/hooks/useScroll.js";

export default {
  components: {
    BaseLayout,
  },
  props: {
    navs: {
      type: Array,
    },
    currentNavKey: {
      type: String,
    },
    anchors: {
      type: Array,
    },
    initTop: {
      type: Number,
      default: 144,
    },
    themeColor: {
      type: String,
      default: "#1BBC9B",
    },
  },
  setup(props) {
    const blockParentRef = ref(null);
    const activeAnchor = ref("");
    const hoverAnchor = ref("");
    const isScrollLock = ref(false);
    onMounted(() => {
      init();
    });
    watch(useScroll(), (windowScrollTop) => {
      if (isScrollLock.value) return;
      setActiveAnchorByScroll(windowScrollTop);
    });
    function init() {
      if (props.anchors && props.anchors[0] && props.anchors[0].href) {
        activeAnchor.value = props.anchors[0].href;
      }
      scrollTo(0);
    }
    function getBlocksOffsetTop() {
      const blockOffsetTopMap = {};
      const containerNodes = blockParentRef.value.children;
      const nodes = Array.from(containerNodes).reverse();
      for (let i = 0; i < nodes.length; i++) {
        blockOffsetTopMap[nodes[i].id] = nodes[i].offsetTop - props.initTop;
      }
      return blockOffsetTopMap;
    }
    function setActiveAnchorByScroll(windowScrollTop) {
      const blockOffsetTopMap = getBlocksOffsetTop();
      for (let key in blockOffsetTopMap) {
        if (windowScrollTop >= blockOffsetTopMap[key]) {
          activeAnchor.value = key;
          break;
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
      isScrollLock.value = true;
      activeAnchor.value = item.href;
      const blockOffsetTopMap = getBlocksOffsetTop();
      scrollTo(blockOffsetTopMap[item.href]);
      setTimeout(() => {
        isScrollLock.value = false;
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
  },
};
</script>

<style lang="less" scoped>
.upanchor-layout {
  padding: 24px;
  padding-top: 80px;

  .anchor-wrap {
    position: fixed;
    top: 64px;
    left: 24px;
    right: 24px;
    padding-top: 24px;
    background-color: #fafafa;

    .anchor {
      background-color: antiquewhite;
      border-radius: 4px;
      padding: 16px;
      position: relative;
      z-index: 1;

      .anchor-item {
        height: 22px;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin-right: 12px;
        cursor: pointer;
        transition: all 0.3s;
        display: inline-block;
      }
    }
  }
}
</style>