import { ref, onMounted, onBeforeMount } from "vue";
export default function () {
  let previde = 0;
  const scrollTop = ref(0);
  const onScrollFunc = () => {
    let nowDate = Date.now();
    if (nowDate - previde > 160) {
      scrollTop.value =
        document.documentElement.scrollTop || document.body.scrollTop;
      previde = nowDate;
    }
  };
  onMounted(() => {
    window.addEventListener("scroll", onScrollFunc);
  });
  onBeforeMount(() => {
    window.removeEventListener("scroll", onScrollFunc);
  });
  return scrollTop;
}
