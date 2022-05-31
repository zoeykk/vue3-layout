<template>
  <BaseLayout :navs="navs" :currentNavKey="currentNavKey">
    <div class="cube-menu-layout">
      <div
        class="cube-menu-layout__menu"
        :style="{
          width: inlineCollapsed ? '64px' : '200px',
          'max-width2': inlineCollapsed ? '64px' : '200px',
          'min-width2': inlineCollapsed ? '64px' : '200px',
        }"
      >
        <div
          class="menu-fix"
          :style="{
            width: inlineCollapsed ? '64px' : '200px',
            'max-width2': inlineCollapsed ? '64px' : '200px',
            'min-width2': inlineCollapsed ? '64px' : '200px',
          }"
        >
          <div class="menu-collapse" @click="onMenuCollapse">
            <span class="icon">
              <IconSvg iconClass="cube-menu-unfold-outlined" />
            </span>
            <span v-show="!inlineCollapsed" class="text">收起导航</span>
          </div>
          <CubeMenu>
            <CubeMenuItem
              v-for="item in menus"
              :key="item.key"
              :item="item"
              :inlineCollapsed="inlineCollapsed"
              @menuClick="onMenuClick"
            >
              <template #icon>
                <IconSvg iconClass="cube-logo" />
              </template>
            </CubeMenuItem>
          </CubeMenu>
        </div>
      </div>
      <div class="cube-menu-layout__content">
        <slot></slot>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref } from "vue";
import IconSvg from "../IconSvg";
import BaseLayout from "../BaseLayout";
import CubeMenu from "../CubeMenu/CubeMenu.vue";
import CubeMenuItem from "../CubeMenu/CubeMenuItem.vue";

export default {
  props: {
    navs: {
      type: Array,
    },
    currentNavKey: {
      type: String,
    },
    menus: {
      type: Array,
    },
  },
  components: {
    IconSvg,
    BaseLayout,
    CubeMenu,
    CubeMenuItem,
  },
  setup(props, { emit }) {
    const inlineCollapsed = ref(false);

    function onMenuCollapse() {
      if (inlineCollapsed.value) {
      }
      inlineCollapsed.value = !inlineCollapsed.value;
    }
    function onMenuClick(item) {
      emit("menuClick", item);
    }

    return { inlineCollapsed, onMenuClick, onMenuCollapse };
  },
};
</script>

<style lang="less" scoped>
.cube-menu-layout {
  display: flex;
  font-size: 14px;

  &__menu {
    box-sizing: border-box;
    background-color: #fff;
    border-right: 1px solid #eee;
    min-height: calc(100vh - 64px);
    transition: all 0.3s;

    .menu-fix {
      min-height: calc(100vh - 64px);
      max-height: calc(100vh - 64px);
      // overflow: auto;
      position: fixed;
      top: 64px;
      left: 0;
      padding-top: 12px;

      .menu-collapse {
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        cursor: pointer;
        .icon {
          position: relative;
          top: 3px;
        }
        .text {
          margin-left: 12px;
        }
      }
    }
  }
  &__content {
    flex: 1;
  }
}
</style>