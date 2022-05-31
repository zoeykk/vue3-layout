<template>
  <DrawerLayout
    :navs="navs"
    currentNavKey="0-1"
    :menus="menus"
    @menuClick="onMenuClick"
    themeColor="#1bbc9b"
  >
    <template #drawer>
      <div class="drawer-content">
        <div class="drawer-content__inner"></div>
      </div>
    </template>
    <div class="content">
      <div class="content__title">{{ selectedMenuItem.name }}</div>
      <div class="content__body">
        {{ selectedMenuItem.name }}
      </div>
    </div>
  </DrawerLayout>
</template>

<script>
import { reactive, toRefs } from "vue";
import DrawerLayout from "@/components/DrawerLayout";
import { NAVS } from "../../config";
export default {
  components: {
    DrawerLayout,
  },
  setup() {
    const data = reactive({
      navs: NAVS,
      selectedMenuItem: {},
      menus: [
        {
          name: "菜单0",
          key: "0",
          children: [
            {
              key: "0-0",
              name: "子菜单0-0",
            },
            {
              key: "0-1",
              name: "子菜单0-1",
            },
          ],
        },
        {
          name: "菜单1",
          key: "1",
          children: [
            {
              key: "1-0",
              name: "子菜单1-0",
            },
            {
              key: "1-1",
              name: "子菜单1-1",
            },
          ],
        },
        {
          name: "菜单2",
          key: "2",
        },
      ],
    });

    function onMenuClick(item) {
      data.selectedMenuItem = item;
    }

    return { ...toRefs(data), onMenuClick };
  },
};
</script>

<style lang="less" scoped>
.drawer-content {
  padding: 0 24px;
  max-height: calc(100vh - 128px);
  overflow: auto;
  background-color: #ddd;
  .drawer-content__inner {
    height: 1600px;
  }
}

.content {
  font-size: 14px;

  &__title {
    height: 54px;
    line-height: 54px;
    background-color: #ffffff;
    font-weight: 500;
    color: #333333;
    padding: 0 24px;
  }

  &__body {
    border-radius: 4px;
    margin: 24px;
    background-color: #fff;
    min-height: calc(100vh - 214px);
    padding: 24px;
    font-weight: 400;
  }
}
</style>