<template>
  <SideAnchorLayout
    :navs="navs"
    currentNavKey="2-0"
    :anchors="anchors"
    themeColor="#52C41A"
    anchorWidth="320px"
  >
    <div id="href1" class="content-item1">内容1</div>
    <div id="href2" class="content-item2">内容2</div>
    <div id="href3" class="content-item3">内容3</div>
    <div id="href4" class="content-item4">内容4</div>
  </SideAnchorLayout>
</template>

<script >
import { reactive, toRefs } from "vue";
import SideAnchorLayout from "@/components/SideAnchorLayout";
import { NAVS } from "../../config";
export default {
  components: {
    SideAnchorLayout,
  },
  setup() {
    const data = reactive({
      navs: NAVS,
      anchors: [
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
      ],
    });
    return { ...toRefs(data) };
  },
};
</script>

<style lang="less" scoped>
.content-item1 {
  height: 400px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.content-item2 {
  height: 600px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.content-item3 {
  height: 2000px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.content-item4 {
  height: 800px;
  background-color: #ffffff;
  border-radius: 4px;
}
</style>