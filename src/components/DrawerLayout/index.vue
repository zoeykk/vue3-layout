<template>
  <BaseLayout
    :navs="navs"
    :currentNavKey="currentNavKey"
    :themeColor="themeColor"
  >
    <div class="cube-drawer-layout">
      <div
        class="cube-drawer-layout__menu"
        :style="{ width: menuVisible ? '200px' : '0' }"
      >
        <div v-show="menuVisible" class="menu-fix">
          <CubeMenu>
            <CubeMenuItem
              v-for="item in menus"
              :key="item.key"
              :item="item"
              @menuClick="onMenuClick"
            >
              <template #icon>
                <IconSvg iconClass="cube-logo" />
              </template>
            </CubeMenuItem>
          </CubeMenu>
        </div>
      </div>
      <div
        class="cube-drawer-layout__drawer"
        :style="{
          width: drawerVisible ? '240px' : '0',
          'border-right': drawerVisible ? '1px solid #eee' : 'none',
        }"
      >
        <div v-show="drawerVisible" class="drawer-content">
          <div class="drawer-content__header">
            <div class="title">{{ selectedMenuItem.name }}</div>
            <div class="close" @click="onDrawerClose">
              <IconSvg iconClass="cube-close" />
            </div>
          </div>
          <slot name="drawer"></slot>
          <div class="expand-toggle" @click="toggleSiderVisible">
            <IconSvg iconClass="cube-double-left" />
          </div>
        </div>
      </div>
      <div class="cube-drawer-layout__content">
        <slot></slot>
      </div>
      <div
        class="cube-collapse-btn"
        v-show="expandToggleVisible"
        @click="toggleSiderVisible"
      >
        <IconSvg iconClass="cube-double-right" />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, computed } from "vue";
import IconSvg from "../IconSvg";
import BaseLayout from "../BaseLayout";
import CubeMenu from "../CubeMenu/CubeMenu.vue";
import CubeMenuItem from "../CubeMenu/CubeMenuItem.vue";

export default {
  components: {
    IconSvg,
    BaseLayout,
    CubeMenu,
    CubeMenuItem,
  },
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
    themeColor: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const menuVisible = ref(true);
    const selectedMenuItem = ref({});
    const drawerVisible = ref(false);
    const expandToggleVisible = computed(() => {
      return !menuVisible.value && !drawerVisible.value;
    });

    function toggleDrawerVisible(b) {
      drawerVisible.value = b;
    }
    function toggleSiderVisible() {
      menuVisible.value = !menuVisible.value;
      drawerVisible.value = !drawerVisible.value;
    }
    function onMenuClick(item) {
      emit("menuClick", item);
      selectedMenuItem.value = item;
      drawerVisible.value = true;
    }
    function onDrawerClose(item) {
      drawerVisible.value = false;
    }

    return {
      menuVisible,
      selectedMenuItem,
      drawerVisible,
      onMenuClick,
      expandToggleVisible,
      toggleDrawerVisible,
      toggleSiderVisible,
      onDrawerClose,
    };
  },
};
</script>

<style lang="less" scoped>
.cube-drawer-layout {
  display: flex;

  .toggle-btn {
    width: 18px;
    height: 42px;
    background: #ffffff;
    border: 1px solid #eee;
    border-left: none;
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
        padding: 16px 16px 14px 16px;

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
          position: relative;
          top: -3px;
        }
      }

      .expand-toggle {
        position: absolute;
        top: 200px;
        right: -18px;
        line-height: 42px;
        .toggle-btn();
      }
    }
  }

  .cube-collapse-btn {
    position: fixed;
    top: 264px;
    left: 0;
    line-height: 42px;
    .toggle-btn();
  }

  .cube-drawer-layout__content {
    flex: 1;
  }
}
</style>