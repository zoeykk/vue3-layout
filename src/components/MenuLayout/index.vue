<template>
  <BaseLayout :navs="navs" :currentNavKey="currentNavKey" :userInfo="userInfo">
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
          <CollapseBtn
            :isCollapsed="inlineCollapsed"
            @toggle="inlineCollapsed = !inlineCollapsed"
          />
          <CubeMenu>
            <CubeMenuItem
              v-for="item in menus"
              :key="item.key"
              :item="item"
              :inlineCollapsed="inlineCollapsed"
              @menuClick="onMenuClick"
            >
              <template #icon>
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  width="16"
                  height="16"
                >
                  <path
                    d="M934.602 336.168c-3.61 0-7.032 0.658-10.14 1.924l-4.562 2.3-342.95 177.876-7.776 3.992s-0.104 0.046-0.104 0.094c-15.12 9.336-25.07 25.012-25.07 42.85v371.708C544 949.676 555.298 960 569.38 960a27.54 27.54 0 0 0 12.13-2.808c0.31-0.19 0.726-0.376 1.038-0.564L932.01 771.24l0.518-0.282c16.482-9.008 27.47-25.484 27.47-44.21V359.164c0.002-12.718-11.4-22.996-25.396-22.996zM908.546 237.042L545.146 73.58S523.828 64 511.992 64s-33.052 9.58-33.052 9.58L115.228 237.042S99.25 243.626 99.25 256c0 13.124 16.6 23 16.6 23l365.164 192.742 5.804 2.958c7.568 3.374 16.154 5.298 25.174 5.298 9.122 0 17.83-1.926 25.484-5.392l5.078-2.63L908.34 278.904s15.016-8.072 15.016-22.906c0-12.998-14.81-18.956-14.81-18.956zM454.932 522.356l-7.984-4.086-342.864-177.876-4.56-2.3c-2.99-1.268-6.516-1.924-10.142-1.924-13.994 0-25.38 10.276-25.38 22.994v367.584c0 18.776 10.97 35.204 27.454 44.21l0.416 0.282L441.35 956.628c3.836 2.16 8.398 3.374 13.272 3.374 13.978 0 25.38-10.324 25.38-23.088V565.206c-0.002-17.838-9.954-33.514-25.07-42.85z"
                    fill="currentColor"
                  ></path>
                </svg>
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
import BaseLayout from "../BaseLayout";
import CubeMenu from "../CubeMenu/CubeMenu.vue";
import CubeMenuItem from "../CubeMenu/CubeMenuItem.vue";
import CollapseBtn from "./CollapseBtn";

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
    userInfo: {
      type: Object,
    },
  },
  components: {
    BaseLayout,
    CubeMenu,
    CubeMenuItem,
    CollapseBtn,
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
      position: fixed;
      top: 64px;
      left: 0;
      padding-top: 12px;
    }
  }
  &__content {
    flex: 1;
  }
}
</style>