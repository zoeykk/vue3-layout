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
              <svg viewBox="0 0 1024 1024" width="16" height="16">
                <path
                  d="M791.113143 226.230857l1.243428 0.877714a29.988571 29.988571 0 0 1 3.072 44.836572l-236.251428 239.981714 236.251428 240.128a29.988571 29.988571 0 0 1-3.072 44.836572l-1.243428 0.877714a36.571429 36.571429 0 0 1-48.347429-3.364572L511.926857 559.908571l-230.692571 234.496a36.571429 36.571429 0 0 1-48.274286 3.364572l-1.316571-0.877714a29.988571 29.988571 0 0 1-3.072-44.836572L464.749714 512 228.571429 271.945143a29.988571 29.988571 0 0 1 3.072-44.836572l1.243428-0.877714a36.571429 36.571429 0 0 1 48.347429 3.364572L512 464.018286l230.765714-234.422857a36.571429 36.571429 0 0 1 48.274286-3.364572z"
                ></path>
              </svg>
            </div>
          </div>
          <slot name="drawer"></slot>
          <div class="expand-toggle" @click="toggleSiderVisible">
            <svg viewBox="0 0 1024 1024" version="1.1" width="16" height="16">
              <path
                d="M451.364571 228.498286a36.498286 36.498286 0 1 1 48.201143 54.857143L238.08 513.316571l261.339429 227.181715a36.571429 36.571429 0 0 1-47.908572 55.003428l-292.717714-254.537143a36.571429 36.571429 0 0 1-3.364572-3.364571 65.389714 65.389714 0 0 1-6.217142-10.24 36.352 36.352 0 0 1-2.925715-13.897143l0.146286-0.585143a35.84 35.84 0 0 1 11.410286-27.282285z m292.571429 0a36.498286 36.498286 0 1 1 48.201143 54.857143L530.651429 513.316571l261.339428 227.181715a36.571429 36.571429 0 0 1-47.908571 55.003428l-292.717715-254.537143a36.571429 36.571429 0 0 1-3.364571-3.364571 65.389714 65.389714 0 0 1-6.217143-10.24 36.352 36.352 0 0 1-2.925714-13.897143l0.146286-0.585143a35.84 35.84 0 0 1 11.117714-26.843428l0.292571-0.438857z"
                fill="currentColor"
              ></path>
            </svg>
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
        <svg viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M572.635429 228.498286a36.498286 36.498286 0 1 0-48.274286 54.857143l261.558857 230.034285-261.339429 227.181715a36.571429 36.571429 0 0 0 47.908572 55.003428l292.717714-254.537143a36.571429 36.571429 0 0 0 3.364572-3.364571 65.389714 65.389714 0 0 0 6.217142-10.24 36.352 36.352 0 0 0 2.925715-13.897143l-0.146286-0.585143a35.84 35.84 0 0 0-11.410286-27.282286z m-292.571429 0a36.498286 36.498286 0 1 0-48.274286 54.857143l261.558857 230.034285-261.339428 227.181715a36.571429 36.571429 0 0 0 47.908571 55.003428l292.717715-254.537143a36.571429 36.571429 0 0 0 3.364571-3.364571 65.389714 65.389714 0 0 0 6.217143-10.24 36.352 36.352 0 0 0 2.925714-13.897143l-0.146286-0.585143a35.84 35.84 0 0 0-11.117714-26.843428l-0.292571-0.438858z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { ref, computed } from "vue";
import BaseLayout from "../BaseLayout";
import CubeMenu from "../CubeMenu/CubeMenu.vue";
import CubeMenuItem from "../CubeMenu/CubeMenuItem.vue";

export default {
  components: {
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
@primay-color: #1bbc9b;
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
        color: #666;
        &:hover {
          color: @primay-color;
        }
      }
    }
  }

  .cube-collapse-btn {
    position: fixed;
    top: 264px;
    left: 0;
    line-height: 42px;
    .toggle-btn();
    color: #666;
    &:hover {
      color: @primay-color;
    }
  }

  .cube-drawer-layout__content {
    flex: 1;
  }
}
</style>