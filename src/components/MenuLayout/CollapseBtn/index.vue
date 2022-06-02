<template>
  <div
    class="collapse-toggle-btn"
    @click="onCollapseBtnToggle"
    :style="{ 'padding-left': isCollapsed ? '24px' : '16px' }"
  >
    <div v-if="isCollapsed" class="collapsed">
      <span class="icon">
        <svg v-if="isCollapsed" viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M928 864a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64h832zM80 336a16 16 0 0 1 9.6 3.2l213.312 160a16 16 0 0 1 0 25.6L89.6 684.8A16 16 0 0 1 64 672V352a16 16 0 0 1 16-16zM928 480a32 32 0 1 1 0 64h-448a32 32 0 0 1 0-64h448z m0-384a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64h832z"
            fill="#666666"
          ></path>
        </svg>
      </span>
      <div class="collapse-tip">
        <div class="collapse-tip__inner">展开导航</div>
      </div>
    </div>
    <div v-else class="expanded">
      <span class="icon">
        <svg viewBox="0 0 1024 1024" width="16" height="16">
          <path
            d="M928 864a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64h832zM304 336A16 16 0 0 1 320 352v320a16 16 0 0 1-25.6 12.8L81.088 524.8a16 16 0 0 1 0-25.6L294.4 339.2a16 16 0 0 1 9.6-3.2zM928 480a32 32 0 1 1 0 64h-448a32 32 0 0 1 0-64h448z m0-384a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64h832z"
            fill="#666666"
          ></path>
        </svg>
      </span>
      <span v-show="!isCollapsed" class="text">收起导航</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    function onCollapseBtnToggle() {
      emit("toggle");
    }
    return { onCollapseBtnToggle };
  },
};
</script>

<style lang="less" scoped>
.collapse-toggle-btn {
  cursor: pointer;
  transition: all 0.2s;
  .icon {
    position: relative;
    top: 3px;
  }
  .collapsed {
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      .collapse-tip {
        display: block;
        z-index: 999;
      }
    }
    .collapse-tip {
      display: none;
      position: absolute;
      top: 4px;
      left: 40px;
      width: 80px;
      height: 32px;
      line-height: 32px;
      padding-left: 4px;
      .collapse-tip__inner {
        padding-left: 12px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          height: 0;
          width: 0;
          border: 3px solid #fff;
          border-right-color: #fff;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-top-color: transparent;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -6px;
        }
      }
    }
  }
  .expanded {
    height: 40px;
    display: flex;
    align-items: center;
    .text {
      margin-left: 12px;
    }
  }
}
</style>