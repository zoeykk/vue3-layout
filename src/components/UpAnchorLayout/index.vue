<template>
  <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
    <div class="content">
      <div class="up">
        <div class="up-inner">
          <ul class="cube-anchor">
            <li
              v-for="item in anchors"
              :key="item.href"
              class="anchor-item"
              :style="{
                color:
                  item.href === hoverAnchor || item.href === activeAnchor
                    ? themeColor
                    : '#333',
              }"
              @click="onAnchorClick(item)"
              @mouseover="onAnchorOver(item)"
              @mouseleave="onAnchorLeave(item)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="down" ref="pageContentRef">
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
    themeColor: {
      type: String,
      default: "#1BBC9B",
    },
  },
  setup(props) {
    const hrefTop = {};
    const pageContentRef = ref(null);
    const activeAnchor = ref("");
    const hoverAnchor = ref("");
    onMounted(() => {
      if (props.anchors && props.anchors[0] && props.anchors[0].href) {
        activeAnchor.value = props.anchors[0].href;
      }
      const containerNode = pageContentRef.value;
      const length = containerNode.children.length;
      const INIT_OFFSETTOP = 144; // 对应滚动 scrollTop = 0
      for (let i = 0; i < length; i++) {
        hrefTop[containerNode.children[i].id] =
          containerNode.children[i].offsetTop - INIT_OFFSETTOP;
      }
      console.log(hrefTop);
    });
    // debounce toggle anchor state when scrolling
    let timeoutId = null;
    watch(useScroll(), (val) => {
      // for (let href in hrefTop) {
      //   console.log(val, hrefTop[href]);
      //   if (val >= hrefTop[href]) {
      //     activeAnchor.value = href;
      //   }
      // }
      // for (let href in hrefTop) {
      //   if (timeoutId) {
      //     clearTimeout(timeoutId);
      //   }
      //   timeoutId = setTimeout(() => {
      //     console.log(val, hrefTop[href]);
      //     if (val >= hrefTop[href]) {
      //       activeAnchor.value = href;
      //     }
      //   }, 200);
      // }
    });
    function onAnchorClick(item) {
      activeAnchor.value = item.href;
      window.scrollTo({
        top: hrefTop[item.href],
        behavior: "smooth",
      });
    }
    function onAnchorOver(item) {
      hoverAnchor.value = item.href;
    }
    function onAnchorLeave(item) {
      hoverAnchor.value = "";
    }
    return {
      pageContentRef,
      activeAnchor,
      hoverAnchor,
      onAnchorClick,
      onAnchorOver,
      onAnchorLeave,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 24px;
  padding-top: 80px;
  .up {
    position: fixed;
    top: 64px;
    left: 24px;
    right: 24px;
    padding-top: 24px;
    background-color: #fff;
    .cube-anchor {
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
  .down {
  }
}
</style>