<template>
  <div>
    <!-- menu -->
    <div
      :class="[
        'menu-item',
        {
          'menu-item--active--flag': isMenuActive,
          'menu-item--collapsed': inlineCollapsed && hasChildren,
          'menu-item--collapsed--tip': inlineCollapsed && !hasChildren,
        },
      ]"
      :style="{ 'padding-left': inlineCollapsed ? '24px' : '16px' }"
      @click="onMenuItemClick"
    >
      <!-- icon -->
      <div class="icon">
        <slot name="icon"></slot>
        <!-- 子菜单气泡 -->
        <div class="submenu-tip">
          <ul class="submenu-tip__inner">
            <li
              :class="[{ 'menu-item--active': citem.key === selectedKey }]"
              v-for="citem in item.children"
              :key="citem.key"
              @click="onSubMenuItemClick(citem)"
            >
              <span>
                {{ citem.name }}
              </span>
            </li>
          </ul>
        </div>
        <!-- 菜单提示 -->
        <div class="menu-tip">
          <div class="menu-tip__inner">
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- title -->
      <div v-show="!inlineCollapsed" class="text">{{ item.name }}</div>
      <!-- arrow -->
      <div v-show="!inlineCollapsed && hasChildren" class="arrow">
        <svg
          :class="['icon', { 'icon-rotate': openKeys.includes(item.key) }]"
          viewBox="0 0 1024 1024"
          width="16"
          height="16"
        >
          <path
            d="M792.137143 338.139429a36.571429 36.571429 0 0 0-51.565714 3.584L513.462857 603.062857 283.282286 341.577143a36.425143 36.425143 0 1 0-54.784 48.201143L485.668571 683.300571l0.438858 0.292572a36.132571 36.132571 0 0 0 26.331428 11.264l0.512-0.146286 0.585143 0.146286a36.352 36.352 0 0 0 13.897143-2.925714 65.389714 65.389714 0 0 0 10.24-6.217143 36.571429 36.571429 0 0 0 3.364571-3.364572l254.537143-292.717714a36.571429 36.571429 0 0 0-3.510857-51.492571"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
    <!-- sub-menu -->
    <HeightTransition>
      <ul
        v-show="!inlineCollapsed && hasChildren && openKeys.includes(item.key)"
        class="submenu-list"
      >
        <li
          :class="[{ 'menu-item--active--flag': citem.key === selectedKey }]"
          v-for="citem in item.children"
          :key="citem.key"
          @click="onSubMenuItemClick(citem)"
        >
          {{ citem.name }}
        </li>
      </ul>
    </HeightTransition>
  </div>
</template>

<script>
import { inject, computed } from "vue";
import HeightTransition from "./HeightTransition.vue";
export default {
  components: {
    HeightTransition,
  },
  props: {
    item: {
      type: Object,
    },
    inlineCollapsed: {
      type: Boolean,
    },
  },
  setup({ item, inlineCollapsed }, { emit }) {
    const openKeys = inject("openKeys");
    const openChange = inject("openChange");
    const selectedKey = inject("selectedKey");
    const changeSelectedKey = inject("changeSelectedKey");
    const hasChildren = computed(() => {
      return Boolean(item.children && item.children.length > 0);
    });
    const isMenuActive = computed(() => {
      return selectedKey.value === item.key;
    });
    function onMenuItemClick() {
      // 收起情况下屏蔽click
      if (inlineCollapsed) return;
      if (hasChildren.value) {
        openChange(item.key);
      } else {
        emit("menuClick", item);
        changeSelectedKey(item.key);
      }
    }
    function onSubMenuItemClick(citem) {
      emit("menuClick", citem);
      changeSelectedKey(citem.key);
    }
    return {
      openKeys,
      selectedKey,
      isMenuActive,
      hasChildren,
      onMenuItemClick,
      onSubMenuItemClick,
    };
  },
};
</script>

<style lang="less" scoped>
@primay-color: #1bbc9b;
.menu-item--active {
  color: @primay-color !important;
  font-weight: 600;
  background-color: rgba(27, 188, 155, 0.04);
  .icon {
    color: @primay-color !important;
  }
}
.menu-item--active--flag {
  .menu-item--active();
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background-color: @primay-color;
  }
}

.menu-item {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 18px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  margin-top: 4px;

  .icon {
    width: 16px;
    margin-top: 3px;
    color: #333;
  }

  .text {
    flex: 1;
    margin-left: 12px;
    line-height: 22px;
  }

  .arrow {
    color: #333;
    .icon {
      position: relative;
      top: 1px;
      transition: 0.2s;
      transform-origin: center;
    }
    .icon-rotate {
      transform: rotate(180deg);
    }
  }

  &:hover {
    color: @primay-color;
    background-color: rgba(27, 188, 155, 0.04);
    .icon {
      color: @primay-color;
    }
    .arrow {
      color: @primay-color;
    }
  }
  &--collapsed {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 18px 0 16px;
    font-size: 14px;
    cursor: pointer;
    position: relative;

    &:hover {
      .submenu-tip {
        display: block;
        z-index: 999;
      }
    }
  }

  &--collapsed--tip {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 18px 0 16px;
    font-size: 14px;
    position: relative;

    &:hover {
      .menu-tip {
        display: block;
        z-index: 999;
      }
    }
  }

  .menu-tip {
    display: none;
    width: 160px;
    position: absolute;
    top: 4px;
    left: 64px;
    padding-left: 4px;
    .menu-tip__inner {
      font-size: 14px;
      font-weight: 400;
      padding: 8px 12px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
        0 9px 28px 8px #0000000d;
      cursor: default;
      color: #666;
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
  .submenu-tip {
    display: none;
    position: absolute;
    top: 0;
    left: 64px;
    padding-left: 4px;
    .submenu-tip__inner {
      font-size: 14px;
      font-weight: 400;
      padding: 4px 0;
      min-width: 160px;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
        0 9px 28px 8px #0000000d;
      li {
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        color: #333;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        &:hover {
          color: @primay-color;
          background-color: rgba(27, 188, 155, 0.04);
        }
      }
    }
  }
}

.submenu-list {
  font-size: 14px;
  font-weight: 400;

  li {
    padding-left: 44px;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      color: @primay-color;
      background-color: rgba(27, 188, 155, 0.04);
    }
  }
}
</style>