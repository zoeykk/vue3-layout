import { ref, onMounted, onBeforeMount } from "vue";
export default function (wait = 0) {
  let previde = 0;
  const scrollTop = ref(0);
  const onScrollFunc = () => {
    let nowDate = Date.now();
    if (nowDate - previde >= wait) {
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
