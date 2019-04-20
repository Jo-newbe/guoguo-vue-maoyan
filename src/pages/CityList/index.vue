<template>
  <div ref="wrapper" class="city-list-container">
    <cube-index-list :data="cities">
      <cube-index-list-group
        v-for="(group, index) in cities"
        :key="index"
        :group="group"
        :data-cate="group.name == '★热门城市' || group.name == '最近访问城市'? 'yes': 'no'"
      >
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem"
        >
          <div style="padding-bottom: 8px;">
            <div
              :class="[
        group.name !== '定位城市' && group.name !== '★热门城市' && group.name!=='最近访问城市'
          ? 'city-item'
          : 'location-city'
      ]"
            >{{item.nm}}</div>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import cityData from "@/data/cities.json";

export default {
  name: "CityList",
  data() {
    return {
      cityData: cityData
    };
  },
  computed: {
    cities() {
      let res = [];
      let cities = this.cityData.letterMap;
      // 添加定位城市
      res.push({ name: "定位城市", items: [this.cityData.geoCity] });
      // 添加热门城市
      res.push({
        name: "★热门城市",
        items: [
          {
            id: 1,
            nm: "北京",
            py: "beijing"
          },
          {
            id: 10,
            nm: "上海",
            py: "shanghai"
          },
          {
            id: 30,
            nm: "深圳",
            py: "shenzhen"
          },
          {
            id: 20,
            nm: "广州",
            py: "guangzhou"
          }
        ]
      });
      // 处理所有城市的分类
      for (let group in cities) {
        res.push({ name: group, items: cities[group] });
      }
      return res;
    }
  },
  methods: {
    // 选中 某个城市 后触发
    selectItem(item) {
      this.setCity(item.nm);
      this.$router.push({ name: "home" });
    },
    ...mapMutations(["setCity"])
  },
  mounted() {
    this.$refs.wrapper.style.height = window.screen.height / 100 + "rem";
  }
};
</script>

<style lang="stylus" scoped>
.city-list-container {
  background-color: #ebebeb;
  font-size: 14px;
  color: #333;
  top: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
  z-index: 1000;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.city-item {
  height: 44px;
  line-height: 44px;
  margin-left: 15px;
  border-bottom: 1px solid #c8c7cc;
  color: #333;
}

.city-title {
  padding: 0 0 0 0.15rem;
}

.location-city {
  background: #fff;
  width: 100%;
  height: 33px;
  margin-top: 15px;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
