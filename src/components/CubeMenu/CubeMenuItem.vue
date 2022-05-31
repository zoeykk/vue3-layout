<template>
  <div class="collapse-wrap">
    <!-- menu -->
    <div
      :class="[
        'menu-item',
        {
          'menu-item--active--flag': isMenuActive,
          'menu-item--collapsed': inlineCollapsed && hasChildren,
          'menu-item--collapsed--only': inlineCollapsed && !hasChildren,
        },
      ]"
      @click="onMenuItemClick"
    >
      <!-- icon -->
      <div class="icon">
        <slot name="icon"></slot>
        <!-- 子菜单气泡 -->
        <ul class="submenu--hover">
          <li
            :class="[{ 'menu-item--active': citem.key === selectedKey }]"
            v-for="citem in item.children"
            :key="citem.key"
            @click="onSubMenuItemClick(citem)"
          >
            {{ citem.name }}
          </li>
        </ul>
        <!-- 菜单提示 -->
        <div class="menu--hover">{{ item.name }}</div>
      </div>
      <!-- title -->
      <div v-show="!inlineCollapsed" class="text">{{ item.name }}</div>
      <!-- arrow -->
      <div v-show="!inlineCollapsed && hasChildren" :class="['arrow']">
        <IconSvg iconClass="cube-down-outlined" />
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
import IconSvg from "../IconSvg";
import HeightTransition from "./HeightTransition.vue";
export default {
  components: {
    IconSvg,
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
.menu-item--active {
  color: #1bbc9b !important;
  font-weight: 600;
  background-color: rgba(27, 188, 155, 0.04);
  .icon {
    color: #1bbc9b !important;
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
    background-color: #1bbc9b;
  }
}

.collapse-wrap {
  .submenu--hover {
    display: none;
    width: 160px;
    position: absolute;
    top: 0;
    left: 64px;
    font-size: 14px;
    font-weight: 400;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    li {
      padding-left: 44px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: #333;
      &:hover {
        color: #1bbc9b;
      }
    }
  }

  .menu--hover {
    display: none;
    width: 160px;
    position: absolute;
    top: 0;
    left: 64px;
    font-size: 14px;
    font-weight: 400;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 8px 12px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    cursor: unset;
    color: #666;
  }

  .menu-item {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 18px 0 16px;
    font-size: 14px;
    cursor: pointer;
    position: relative;

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
    }

    &:hover {
      color: #1bbc9b;
      .icon {
        color: #1bbc9b;
      }
      .arrow {
        color: #1bbc9b;
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
        .submenu--hover {
          display: block;
        }
      }
    }

    &--collapsed--only {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 18px 0 16px;
      font-size: 14px;
      position: relative;

      &:hover {
        .menu--hover {
          display: block;
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
      cursor: pointer;

      &:hover {
        color: #1bbc9b;
      }
    }
  }
}
</style>