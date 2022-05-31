<template>
  <div class="cube-base-layout">
    <div class="cube-base-layout__nav-wrap">
      <div class="cube-nav" :style="{ 'background-color': themeColor }">
        <div class="cube-nav__logo"></div>
        <div class="cube-nav__gmenu"></div>
        <ul class="cube-nav__menu">
          <li v-for="item in navs" :key="item.key">
            <!-- 展示菜单 -->
            <span
              :style="{
                color: item.children
                  .map((citem) => citem.key)
                  .includes(currentNavKey)
                  ? '#fff'
                  : '',
              }"
            >
              <!-- 导航名称-有下拉菜单 -->
              <span v-if="item.children && item.children.length">
                {{ item.name }}
              </span>
              <!-- 导航名称-无下拉菜单 -->
              <a v-else :href="item.url">{{ item.name }}</a>
            </span>
            <span v-if="item.children && item.children.length" class="icon">
              <IconSvg iconClass="cube-down-outlined" />
            </span>
            <!-- 下拉菜单 -->
            <ul v-if="item.children && item.children.length" class="sub-menus">
              <li v-for="(citem, cindex) in item.children" :key="cindex">
                <a
                  :href="citem.url"
                  :class="{ 'sub-menu--active': citem.key === currentNavKey }"
                >
                  {{ citem.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="cube-nav__user"></div>
      </div>
    </div>
    <div class="cube-base-layout__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IconSvg from "../IconSvg";
export default {
  components: {
    IconSvg,
  },
  props: {
    navs: {
      type: Array,
    },
    currentNavKey: {
      type: String,
    },
    themeColor: {
      type: String,
      default: "#1BBC9B",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.cube-base-layout {
  padding-top: 64px;

  &__nav-wrap {
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;

    .cube-nav {
      height: 64px;
      // background-color: #1bbc9b;
      padding: 0 40px;
      display: flex;
      align-items: center;

      &__logo {
        width: 100px;
        height: 30px;
        background-color: #fff;
      }

      &__gmenu {
        width: 16px;
        height: 16px;
        background-color: #fff;
        margin: 0 40px 0 32px;
      }

      &__menu {
        flex: 1;
        display: flex;

        & > li {
          margin-left: 32px;
          font-size: 14px;
          height: 64px;
          line-height: 64px;
          font-weight: 400;
          color: #bbebe1;
          cursor: pointer;
          position: relative;

          .icon {
            color: #fff;
            position: relative;
            top: 2px;
            margin-left: 2px;
          }

          .sub-menus {
            position: absolute;
            top: 64px;
            left: -8px;
            box-sizing: border-box;
            width: 100px;
            background-color: #ffffff;
            box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            padding: 6px 16px 6px 8px;
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s;

            & > li {
              height: 22px;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 22px;
              margin-bottom: 10px;

              &:last-child {
                margin-bottom: 0;
              }

              &:hover {
                a {
                  color: #1bbc9b;
                }
              }
            }

            .sub-menu--active {
              color: #1bbc9b;
            }
          }

          &:hover {
            .sub-menus {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      }

      &__user {
        width: 80px;
        height: 24px;
        margin-left: 16px;
        background-color: #fff;
      }
    }
  }

  &__content {
    min-height: calc(100vh - 64px);
  }
}
</style>