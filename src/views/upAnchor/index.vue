<template>
  <UpAnchorLayout :navs="navs" currentNavKey="2-1" :anchors="anchors" themeColor="#1BBC9B" anchorWidth="320px">
    <div id="href1" class="left-item1">1</div>
    <div id="href2" class="left-item2">2</div>
    <div id="href3" class="left-item3">3</div>
    <div id="href4" class="left-item4">4</div>
  </UpAnchorLayout>
</template>

<script >
import { reactive, toRefs } from 'vue'
import UpAnchorLayout from "@/components/UpAnchorLayout";
import { NAVS } from '../../config'
export default {
  components: {
    UpAnchorLayout,
  },
  setup() {
    const data = reactive(
      {
        navs: NAVS,
        anchors: [{
          href: "href1",
          title: "锚点选项1"
        }, {
          href: "href2",
          title: "锚点选项2"
        }, {
          href: "href3",
          title: "锚点选项3"
        }, {
          href: "href4",
          title: "锚点选项4"
        }]
      }
    )
    return { ...toRefs(data) }
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