<template>
  <div class="cube-nav__user">
    <div class="avatar">
      <img v-if="userInfo.headImg" :src="userInfo.headImg" alt="user" />
      <svg v-else viewBox="0 0 1024 1024" width="32" height="32">
        <path
          d="M511.984 288c61.6 0 111.072 55.04 111.072 123.2 0 68.128-49.472 123.184-111.072 123.184s-111.072-55.056-111.072-123.184c0-68.16 49.472-123.2 111.072-123.2M736 670.688v20.48C736 715.488 715.44 736 691.168 736H332.8C308.528 736 288 715.472 288 691.168v-20.48c0-54.144 63.44-87.776 123.168-113.92l5.616-2.768c4.688-1.872 9.328-1.872 14.016 0.928 24.256 15.888 51.328 24.272 80.24 24.272 28.96 0 56.928-9.36 80.256-24.272a14.944 14.944 0 0 1 14.016-0.928l5.6 2.768c61.6 26.144 125.088 58.832 125.088 113.92"
          fill="#dde4ef"
        ></path>
      </svg>
      <div v-show="userInfo.isLogin" class="modal_info">
        <div class="modal_info_con">
          <div class="modal_permissions">
            <p class="modal_permissions_tit">我的权限范围</p>
            <table
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              class="table_permissions"
            >
              <tbody>
                <tr
                  v-for="(item, index) in userInfo.vipInfo"
                  :key="index"
                  :class="item.isAuth ? '' : 'off'"
                >
                  <td style="text-align: left">
                    {{ item.name }}
                    <span
                      v-for="(citem, cindex) in item.children"
                      :key="cindex"
                      :class="citem.class"
                    >
                      {{ citem.tag }}
                    </span>
                  </td>
                  <td style="text-align: center">
                    <span v-if="item.isAuth" class="status"> 已开通 </span>
                    <span v-else class="status">未开通</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="fotter_nav">
            <a
              :href="baseUrl + '/home/my_permissions'"
              class="vip_btn"
              target="_blank"
            >
              我的权限
            </a>
            <a
              :href="dbBaseUrl + '/database/pharmaGo/base_warning/index'"
              class="warn_btn"
              target="_blank"
            >
              预警中心
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
    },
    baseUrl: {
      type: String,
    },
    dbBaseUrl: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.cube-nav__user {
  position: relative;
  display: flex;
  align-items: center;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .modal_info {
    display: none;
    width: 350px;
    position: absolute;
    left: -240px;
    top: 30px;
    z-index: 20;
    .modal_info_con {
      width: 100%;
      background: #fff;
      border: 1px solid #e9e9e9;
      margin-top: 18px;
      .modal_permissions {
        padding: 15px;
        .modal_permissions_tit {
          width: 100%;
          line-height: 35px;
          font-size: 14px;
          color: #333;
        }
        .table_permissions {
          border-right: 1px solid #e9e9e9;
          border-top: 1px solid #e9e9e9;
          margin-top: 10px;
        }
        .table_permissions td {
          line-height: 22px;
          padding: 5px 5px;
          width: auto;
          color: #333;
          font-size: 14px;
          word-break: break-all;
          word-wrap: break-word;
          border-left: 1px solid #eee;
          border-bottom: 1px solid #eee;
          position: relative;
        }
        .table_permissions td strong {
          position: relative;
          left: 2px;
          top: -5px;
          font-weight: normal;
        }
        .table_permissions .off {
          background: #fafafb;
        }
        .table_permissions .off td {
          color: #999999;
        }
        .table_permissions td .status {
          font-size: 12px;
        }
        .table_permissions td .status:before {
          content: "";
          width: 15px;
          height: 15px;
          background: url(../assets/login_icon1.png) no-repeat;
          background-size: cover;
          display: inline-block;
          vertical-align: middle;
          margin: -2px 5px 0px 0px;
        }
        .table_permissions .off td .status:before {
          content: "";
          width: 15px;
          height: 15px;
          background: url(../assets/login_icon2.png) no-repeat;
          background-size: cover;
          display: inline-block;
          vertical-align: middle;
          margin: -2px 5px 0px 0px;
        }
      }
      .fotter_nav {
        width: 100%;
        background: #f5f6f9;
        height: 40px;
      }

      .fotter_nav a {
        width: 50%;
        float: left;
        color: #333 !important;
        font-size: 13px !important;
        line-height: 40px !important;
        text-align: center;
      }

      .fotter_nav a:hover {
        color: #3ab483 !important;
      }

      .fotter_nav a:hover.vip_btn:before {
        content: "";
        width: 15px;
        height: 18px;
        background: url(../assets/login_icon5.png) no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
        margin: -3px 5px 0px 0px;
      }

      .fotter_nav a:hover.warn_btn:before {
        content: "";
        width: 17px;
        height: 16px;
        background: url(../assets/login_icon6_off.png) no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
        margin: -3px 5px 0px 0px;
      }
      .vip_btn:before {
        content: "";
        width: 15px;
        height: 18px;
        background: url(../assets/login_icon5_off.png) no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
        margin: -3px 5px 0px 0px;
      }
      .warn_btn:before {
        content: "";
        width: 17px;
        height: 16px;
        background: url(../assets/login_icon6.png) no-repeat;
        background-size: cover;
        display: inline-block;
        vertical-align: middle;
        margin: -3px 5px 0px 0px;
      }
    }
  }
  .avatar:hover .modal_info {
    display: block;
  }
  .base-vip-tag {
    display: inline-block;
    border-radius: 4px;
    font-size: 12px;
    height: 18px;
    line-height: 16px;
    padding: 0px 4px;
    color: #fff;
    margin-left: 5px;
  }
  .SVIP {
    .base-vip-tag();
    background: #ffae00;
  }

  .FREE {
    .base-vip-tag();
    background: #666666;
  }

  .VIP {
    .base-vip-tag();
    background: #ff4929;
  }

  .IPM {
    .base-vip-tag();
    background: #099ac7;
  }

  .NEXT {
    .base-vip-tag();
    background: #0c6eb7;
  }

  .MAX {
    .base-vip-tag();
    background: #099ac7;
  }

  .Invest {
    .base-vip-tag();
    background: #333333;
  }

  .Gen {
    .base-vip-tag();
    background: #1dbd9c;
  }

  .CPGs {
    .base-vip-tag();
    background: #1dbd9c;
  }
}
</style>