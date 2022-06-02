<template>
  <MenuLayout
    :navs="navs"
    currentNavKey="0-0"
    :menus="menus"
    @menuClick="onMenuClick"
    :userInfo="userInfo"
  >
    <div class="content">
      <div class="content__title">{{ title }}</div>
      <div class="content__body">
        {{ title }}
      </div>
    </div>
  </MenuLayout>
</template>

<script>
import { reactive, toRefs } from "vue";
import MenuLayout from "@/components/MenuLayout";
import { NAVS } from "../../config";
export default {
  components: {
    MenuLayout,
  },
  setup() {
    const data = reactive({
      navs: NAVS,
      title: "医药魔方",
      menus: [
        {
          name: "菜单0",
          key: "0",
          children: [
            {
              key: "0-0",
              name: "子菜单子菜单0-0",
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
      userInfo: {
        isLogin: true,
        uid: "o8Fiyt-tKVOsgjz-7sSW72UoUYeM",
        lastLoginTime: 1654049784942,
        vipInfo: {
          isLogin: true,
          isSvip: true,
          isVip: true,
          isFree: false,
          isSvipT: false,
          isNvip: true,
          isNvipTemp: false,
          isNTvip: false,
          isDvip: true,
          isMvip: false,
          isTvip: true,
          isTvipT: false,
          isIvip: false,
          isBvip: false,
          isMaxvip: false,
          isGvip: true,
          isFvip: true,
          isFvipT: false,
          isCvip: true,
          isCvipT: false,
          isEvip: true,
          isInn: false,
          isPvip: true,
          isPcvip: true,
          isHvip: true,
          isCTvip: true,
          isSitevip: false,
          isBnwSubVip: false,
          is_member_en: false,
          is_member_mail: false,
          sitevipTemp: false,
          ctvipTemp: false,
        },
        headImg:
          "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK9CMXiaOA84cboVBm3yfn9XP4U9B48e1TibQzCPZoGa962EEtJrAia0Osic4TgAWpfbl51icdsCaJcf1A/132",
        isShowDataCentre: false,
        nickname: "没有声音",
      },
    });

    function onMenuClick(item2) {
      data.title = item2.name;
    }

    return { ...toRefs(data), onMenuClick };
  },
};
</script>

<style lang="less" scoped>
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
    min-height: 800px;
    padding: 24px;
    font-weight: 400;
  }
}
</style>