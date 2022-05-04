<template>
    <Transition name="height-transition" @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave">
        <slot></slot>
    </Transition>
</template>

<script>
export default {
    setup() {
        const elTransition =
            "0.2s height ease-in-out, 0.2s padding-top ease-in-out, 0.2s padding-bottom ease-in-out";
        function onBeforeEnter(el) {
            el.style.transition = elTransition;
            if (!el.dataset) el.dataset = {};
            el.dataset.oldPaddingTop = el.style.paddingTop;
            el.dataset.oldPaddingBottom = el.style.paddingBottom;
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
        function onEnter(el) {
            el.dataset.oldOverflow = el.style.overflow;
            if (el.scrollHeight !== 0) {
                el.style.height = el.scrollHeight + "px";
                el.style.paddingTop = el.dataset.oldPaddingTop;
                el.style.paddingBottom = el.dataset.oldPaddingBottom;
            } else {
                el.style.height = "";
                el.style.paddingTop = el.dataset.oldPaddingTop;
                el.style.paddingBottom = el.dataset.oldPaddingBottom;
            }
            el.style.overflow = "hidden";
        }
        function onAfterEnter(el) {
            el.style.transition = "";
            el.style.height = "";
            el.style.overflow = el.dataset.oldOverflow;
        }
        function onBeforeLeave(el) {
            if (!el.dataset) el.dataset = {};
            el.dataset.oldPaddingTop = el.style.paddingTop;
            el.dataset.oldPaddingBottom = el.style.paddingBottom;
            el.dataset.oldOverflow = el.style.overflow;

            el.style.height = el.scrollHeight + "px";
            el.style.overflow = "hidden";
        }
        function onLeave(el) {
            if (el.scrollHeight !== 0) {
                el.style.transition = elTransition;
                el.style.height = 0;
                el.style.paddingTop = 0;
                el.style.paddingBottom = 0;
            }
        }
        function onAfterLeave(el) {
            el.style.transition = "";
            el.style.height = "";
            el.style.overflow = el.dataset.oldOverflow;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
        return {
            onBeforeEnter, onEnter, onAfterEnter
            , onBeforeLeave, onLeave, onAfterLeave
        }
    }
}
</script>

<style lang="less" scoped>
</style>