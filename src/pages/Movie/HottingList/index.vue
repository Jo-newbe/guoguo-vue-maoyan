<template>
  <section ref="wrapper" class="wrapper">
    <div class="list-wrap" style="margin-top: 0px;">
      <div class="item" v-for="m of movieList" :key="m.id">
        <div class="main-block">
          <div class="avatar" sort-flag>
            <div class="default-img-bg">
              <img
                :src="m.img.replace(/^http/, 'https').replace(/(w\.h)/, '128.180')"
                onerror="this.style.visibility='hidden'"
              >
            </div>
          </div>
          <div class="mb-outline-b content-wrapper">
            <div class="column content">
              <div class="box-flex movie-title">
                <div class="title line-ellipsis">{{ m.nm }}</div>
                <span class="version v3d imax" v-if="m.version"></span>
              </div>

              <div class="detail column">
                <div class="score line-ellipsis">
                  <span class="score-suffix">{{ '观众评'+ ' ' }}</span>
                  <span class="grade">{{ m.sc }}</span>
                </div>

                <div class="actor line-ellipsis">主演: {{ m.star }}</div>

                <div class="show-info line-ellipsis">{{ m.showInfo }}</div>
              </div>
            </div>

            <div class="button-block">
              <div class="btn" :class="[new Date(m.rt).getTime() > Date.now() ? 'pre': 'normal']">
                <span
                  class="fix"
                  data-bid="dp_wx_home_movie_btn"
                >{{ new Date(m.rt).getTime() > Date.now() ? '预售' : '购票' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import { setTimeout } from "timers";

export default {
  name: "HottingList",
  data() {
    return {
      movieList: []
    };
  },
  methods: {
    showToastMask() {
      var toast = (this._toast = this.$createToast({
        txt: "Loading...",
        mask: true
      }));
      toast.show();
    },
    loadData(callback) {
      // 先显示loading
      this.showToastMask();
      axios
        .get("/maoyan/ajax/movieOnInfoList?token=")
        .then(response => {
          if (response.status === 200) {
            this.movieList = response.data.movieList;
            // 数据加载 成功后 隐藏loading
            this._toast.hide();
            // 在下一次事件循环 开始 之前  去刷新scroll 让其 重新计算scroll height
            // callback();
            this.$nextTick(callback);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    _initScroll() {
      const { wrapper } = this.$refs;
      // 如果已经存在了 scroll实例 就让其刷新
      if (this._scroll) {
        this._scroll.refresh();
        return;
      }
      this._scroll = new BScroll(wrapper, {
        click: true,
        probeType: 1
      });

      console.log(this._scroll);
    }
  },
  mounted() {
    // 当组件挂载后
    // 设置 wrapper的 高度
    this.$refs.wrapper.style.height =
      (window.screen.height - 51 - 44 - 48) / 100 + "rem";
    // 初始化滚动条
    this._initScroll();
    // 加载数据
    this.loadData(() => {
      // setTimeout(() => {
      //   this._scroll.refresh();
      // }, 20);
      // this.$nextTick(() => {
      //   this._scroll.refresh();
      // });

      this._scroll.refresh();
    });
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next();
  }
};
</script>

<style lang="stylus" scoped>
.list-wrap {
  background-color: #f5f5f5;

  .item {
    padding-left: 15px;
    background-color: #fff;

    .main-block {
      position: relative;
      width: 100%;
    }

    .avatar {
      width: 64px;
      height: 90px;
      position: relative;
      margin-top: 12px;
      float: left;

      img {
        background-color: transparent;
        height: 90px;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 46px;
        height: 46px;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }

    .content-wrapper {
      padding: 12px 14px 12px 0;
      margin-left: 74px;
      height: 90px;
      max-height: 90px;
      position: relative;
    }

    .content {
      padding-right: 5px;
      margin-right: 48px;
      overflow: hidden;
    }

    .movie-title {
      max-height: 24px;
      margin-bottom: 7px;
      line-height: 24px;
      overflow: hidden;
    }

    .title {
      font-size: 17px;
      color: #333;
      font-weight: 700;
      padding-right: 5px;
      flex-shrink: 1;
    }

    .detail {
      box-sizing: border-box;
      line-height: 1;
      overflow: hidden;

      &>div+div {
        margin-top: 6px;
        line-height: 15px;
      }

      .show-date, .score, .show-info, .actor {
        font-size: 13px;
        color: #666;
      }

      .score {
        .grade {
          font-weight: 700;
          color: #faaf00;
          font-size: 15px;
        }
      }
    }

    .button-block {
      font-size: 12px;
      position: absolute;
      right: 14px;
      top: 0;
      bottom: 0;
      height: 27px;
      margin: auto;

      .btn {
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        white-space: nowrap;
        font-size: 12px;
        cursor: pointer;
      }

      .btn.pre {
        background-color: #3c9fe6;
      }
    }
  }
}

.default-img-bg {
  background-color: #e1e1e1;
  background-size: 100% 100%;
}

@media (-webkit-min-device-pixel-ratio: 2), (-webkit-min-device-pixel-ratio: 3) {
  .mb-outline-b {
    background-size: 1px 1px;
  }
}

.mb-outline-b {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzhCNEEzQTE0NzNBMTFFNkEyMkFFN0M2MDc0NjIyN0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzhCNEEzQTA0NzNBMTFFNkEyMkFFN0M2MDc0NjIyN0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Mzg3REIwMzQ3MzcxMUU2QTIyQUU3QzYwNzQ2MjI3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2Mzg3REIwNDQ3MzcxMUU2QTIyQUU3QzYwNzQ2MjI3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoL90/MAAAAZSURBVHjaYvr//z8DCLM8evToPwMQAAQYAGuLCaa37ZaAAAAAAElFTkSuQmCC') 0 bottom repeat-x;
}

.box-flex {
  display: -webkit-box;
  display: flex;
}

.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.pre-show, .version {
  background-size: contain;
  background-repeat: no-repeat;
  height: 14px;
  width: 17px;
  display: inline-block;
  margin-top: 5px;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  margin-right: 3px;
}

.version.v3d.imax {
  width: 43px;
  background-image: url('data:image/png;base64,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');
}

.wrapper {
  width: 100%;
  overflow: hidden;
}
</style>