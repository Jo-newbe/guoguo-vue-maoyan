<template>
  <div ref="wrapper" class="list-wrap">
    <div>
      <div class="most-expected">
        <p class="title">近期最受期待</p>
        <div ref="expectedWrapper">
          <div class="most-expected-list" ref="expectedContent">
            <div class="expected-item" v-for="m of expectedMovies" :key="m.id" :data-id="m.id">
              <div class="poster default-img-bg">
                <img
                  :src="m.img.replace(/^http/, 'https').replace(/(w\.h)/, '170.230')"
                  onerror="this.style.visibility='hidden'"
                >
                <span class="wish-bg"></span>
                <span class="wish">
                  <span class="wish-num">{{ m.wish }}</span>人想看
                </span>
                <div class="toggle-wish" :data-wishst="m.wishst">
                  <span></span>
                </div>
              </div>
              <h5 class="name line-ellipsis">{{ m.nm }}</h5>
              <p class="date">{{ m.comingTitle.split(' ')[0] }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="coming-list">
        <div v-for="m of comingMovies" :key="m.id">
          <p class="group-date">{{ m.comingTitle }}</p>

          <div class="item" :data-id="m.id" data-bid="dp_wx_home_movie_list">
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
                  </div>

                  <div class="detail column">
                    <div class="wantsee line-ellipsis">
                      <span class="person">{{ m.wish }}</span>
                      <span class="p-suffix">人想看</span>
                    </div>

                    <div class="actor line-ellipsis">主演: {{ m.star }}</div>

                    <div class="actor line-ellipsis">{{ m.showInfo }}</div>
                  </div>
                </div>

                <div class="button-block">
                  <div class="btn" :class="[m.showst == 1 ? 'want' : 'pre']">
                    <span
                      class="fix"
                      data-bid="dp_wx_home_movie_btn"
                    >{{m.showst == 1 ? '想看' : '预售' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import axios from "axios";

export default {
  name: "ComingList",
  data() {
    return {
      expectedMovies: [],
      comingMovies: [],
      options: {
        click: true,
        probeType: 2
      }
    };
  },
  methods: {
    refresh() {
      // dom更新后 重新计算宽度
      this.$nextTick(() => {
        // 只有水平滚动 需要 计算内容宽度 刷新expected-list
        this._initWidth();
        this._expectedScroll.refresh();
      });
    },
    loadExpectedMovies() {
      return axios.get(
        "/maoyan/ajax/mostExpected?ci=1&limit=10&offset=0&token="
      );
    },
    loadComingMovies() {
      return axios.get("/maoyan/ajax/comingList?ci=1&token=&limit=10");
    },
    loadData() {
      this.$toast.show();

      axios.all([this.loadExpectedMovies(), this.loadComingMovies()]).then(
        axios.spread((expected, coming) => {
          if (expected.status === 200) {
            this.expectedMovies = expected.data.coming;
          }

          if (coming.status === 200) {
            this.comingMovies = coming.data.coming;
          }
          this.refresh();
          this.$toast.hide();
        })
      );
    },
    _initWidth() {
      let { expectedContent } = this.$refs;
      expectedContent.style.width = this.expectedMovies.length * 95 + "px";
    },
    _initExpectedSrcoll() {
      let { expectedWrapper } = this.$refs;

      if (!expectedWrapper) return;

      if (this._expectedScroll) {
        this._expectedScroll.refresh();
        return;
      }

      this._expectedScroll = new BScroll(expectedWrapper, {
        click: this.options.click,
        probeType: this.options.probeType,
        scrollX: true,
        scrollY: false
      });
    },
    _initScroll() {
      let { wrapper } = this.$refs;

      if (!wrapper) return;

      if (this._scroll) {
        this._scroll.refresh();
        return;
      }

      this._scroll = new BScroll(wrapper, {
        click: this.options.click,
        probeType: this.options.probeType,
        scrollX: false,
        scrollY: true
      });
    }
  },
  mounted() {
    this.$refs.wrapper.style.height =
      (window.screen.height - 51 - 44 - 48) / 100 + "rem";
    // 异步加载数据
    this.loadData();
    // 初始化scroll
    this._initScroll();
    this._initExpectedSrcoll();
  }
};
</script>

<style lang="stylus" scoped>
.list-wrap {
  background-color: #f5f5f5;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
}

.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

h5 {
  display: block;
  font-size: 0.83em;
  margin-block-start: 1.67em;
  margin-block-end: 1.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.most-expected {
  padding: 12px 0 12px 15px;
  background-color: #fff;
  margin-bottom: 10px;

  .title {
    margin: 0 0 12px;
    font-size: 14px;
    color: #333;
  }
}

.most-expected-list {
  overflow: scroll;
  white-space: nowrap;

  .expected-item {
    display: inline-block;
    width: 85px;
    overflow: hidden;
    margin-right: 10px;

    .date {
      margin: 0;
      font-size: 12px;
      color: #999;
    }

    .name {
      margin: 0 0 3px;
      font-size: 13px;
      color: #222;
    }

    .poster {
      width: 85px;
      height: 115px;
      position: relative;
      margin-bottom: 6px;

      .wish {
        position: absolute;
        left: 4px;
        bottom: 2px;
        color: #faaf00;
        font-size: 11px;
        font-weight: 600;
      }

      img {
        height: 100%;
      }

      .wish-bg {
        display: inline-block;
        width: 100%;
        height: 35px;
        position: absolute;
        bottom: 0;
        background-image: -webkit-linear-gradient(top, rgba(77, 77, 77, 0), #000);
        background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
      }

      .toggle-wish {
        width: 28px;
        line-height: 28px;
        background: rgba(61, 63, 71, 0.6);
        text-align: center;
        border-bottom-right-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;

        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-size: 100%;
          background-repeat: no-repeat;
        }

        &[data-wishst='0'] {
          span {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAABGdBTUEAALGPC/xhBQAAAytJREFUWAnVmLtrFFEUh3cWFAtRE5FEEUREsFAkooUIgl3+CUEU7LVR1LBIMERCLFLZRG1CrFJYpLBQENRGC4n4wBeKRUQ2PlAQX+v3m70z7MzemZ3HZp05cPbce86553w7O7Mzc51KjDQaDYfwDvSAseux69Cv6Ef0LXoHXXAc5y82UqhVJbgLPYhuQTega9DPaB19ht6VpVYDaxUBWYUGewkcQzdbE4LOJabXaHQ76G7OqHWI0RG0v+mJ/XxPdJpaD2xZbcAUX0XiSXS/bUEH3yPil2imL1Chln6RE+huzVPKffJV60frugAwDfoI1tBtrUkpx4vknzVrLmAHU65vTX/F5DzQnzynDwzsCpwX0e1eMIfV+S3ReZpXXlDgFNC/VEgXgifHGXQDVvUE2g1Y1RKT2FxxgTm6cg4bXxHNsGH0j/DhIlKGmFzGKuSbCAyFgkWcDsG6UaeE/m/LIvsEvKcstGIV8ECJgAcErJtFWaRPwCvLQitWAbv3/ZJALwlYj3ZlkbqA9YBRFnkp4HtloRWrgJ+g/uNbgeHF+LTKY5tebWYLDOqhzYpVR1hyE33njor5ITYxNp/WIP/DeBINvI4ooQAipknD6D9eVnC8JjCOxr799vgLiGXcsLmtvVPCnRB4yGDanRTjQ2/PYvIlACwvCTcwM37G/xvMGJYAQRuwoiRex8wFMns7mTMMbV2twMpiwVXMfNuK5XfMm97WTpHAJvsy9pZ15fI41Us9IyUWmG+qPa4ptBe3b/WYMj2zAWsVBfQfPYEGrlbFuiiqPWF6xZaNPcLeSgr9ZjyGLni+LlrVHDM9OpZNBKwqFPyJGUWfa94lUa1RUztRSX9vLVE2SewNrMboaG9NuiYi7w3+M8B+i4hb3amBVQXotRjdxpPsHWtJWLQHfBrYL+FAp3kmYBUFWnu/2u1Mu03wgTXajaxjU0tmYHUCehAj6H7NE4ggBSvoTJL4orNVp/Eifm1eJ/lplXMuD6wYcgGrAAA6H0fQ75pHiGIjJjciJZk7N7DaAKIrvobarnj5aiaHYT7JdQ6HW5sL8Sj+nSb2GHsF2EwXWLi+5v8ArR6xIZ+h44wAAAAASUVORK5CYII=');
          }
        }
      }
    }
  }
}

.default-img-bg {
  background-color: #e1e1e1;
  background-size: 100% 100%;
}

.coming-list {
  background-color: #fff;

  .group-date {
    padding: 12px 15px 0;
    margin: 0;
    font-size: 14px;
    color: #333;
  }
}

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

    &:before {
      display: block;
      position: absolute;
      width: 46px;
      height: 46px;
      background-repeat: no-repeat;
      background-size: contain;
    }

    img {
      background-color: transparent;
      height: 90px;
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

    .person {
      color: #faaf00;
      font-size: 15px;
      font-weight: 600;
    }

    .p-suffix {
      font-size: 13px;
      margin-left: -2px;
      display: inline-block;
      color: #666;
    }

    .actor {
      font-size: 13px;
      color: #666;
    }

    &>div+div {
      margin-top: 6px;
      line-height: 15px;
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

      &.pre {
        background-color: #3c9fe6;
      }

      &.want {
        background-color: #faaf00;
        border: none;
        color: #fff;
      }
    }
  }
}

.box-flex {
  display: -webkit-box;
  display: flex;
}

@media (-webkit-min-device-pixel-ratio: 2), (-webkit-min-device-pixel-ratio: 3) {
  .mb-outline-b {
    background-size: 1px 1px;
  }
}

.mb-outline-b {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzhCNEEzQTE0NzNBMTFFNkEyMkFFN0M2MDc0NjIyN0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzhCNEEzQTA0NzNBMTFFNkEyMkFFN0M2MDc0NjIyN0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Mzg3REIwMzQ3MzcxMUU2QTIyQUU3QzYwNzQ2MjI3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2Mzg3REIwNDQ3MzcxMUU2QTIyQUU3QzYwNzQ2MjI3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoL90/MAAAAZSURBVHjaYvr//z8DCLM8evToPwMQAAQYAGuLCaa37ZaAAAAAAElFTkSuQmCC') 0 bottom repeat-x;
}
</style>

