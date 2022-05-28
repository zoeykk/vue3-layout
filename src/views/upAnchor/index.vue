<template>
  <UpAnchorLayout :navs="navs" currentNavKey="2" :anchors="anchors" themeColor="#1BBC9B" anchorWidth="320px">
    <div id="href1" class="left-item1">1</div>
    <div id="href2" class="left-item2">2</div>
    <div id="href3" class="left-item3">3</div>
    <div id="href4" class="left-item4">4</div>
  </UpAnchorLayout>
</template>

<script >
import { reactive } from "vue";
import UpAnchorLayout from "@/components/UpAnchorLayout";
export default {
  components: {
    UpAnchorLayout,
  },
  setup() {
    const navs = reactive([
      {
        name: "未选中项1",
        key: "1",
        children: [
          {
            name: "选项一",
            key: "10",
            url: "https://www.baidu.com/",
          },
          {
            name: "选项二",
            key: "11",
            url: "https://www.baidu.com/",
          },
          {
            name: "选项三",
            key: "12",
            url: "https://www.baidu.com/",
          },
        ],
      },
      {
        name: "未选中项2",
        key: "2",
        children: [
          {
            name: "选项一",
            key: "20",
            url: "https://www.baidu.com/",
          },
          {
            name: "选项二",
            key: "21",
            url: "https://www.baidu.com/",
          },
        ],
      },
      {
        name: "已选中项",
        key: "3",
        url: "https://www.baidu.com/",
      },
    ]);
    const anchors = reactive([
      {
        href: "href1",
        title: "锚点选项1",
      },
      {
        href: "href2",
        title: "锚点选项2",
      },
      {
        href: "href3",
        title: "锚点选项3",
      },
      {
        href: "href4",
        title: "锚点选项4",
      },
    ]);
    return { navs, anchors };
  },
};
</script>

<style lang="less" scoped>
.left-item1 {
  height: 2000px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.left-item2 {
  height: 2000px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.left-item3 {
  height: 2000px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.left-item4 {
  height: 800px;
  background-color: #ffffff;
  border-radius: 4px;
  // margin-bottom: 24px;
}
</style>