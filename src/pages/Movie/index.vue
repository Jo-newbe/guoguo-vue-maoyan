<template>
  <div class="movie">
    <AppHeader/>
    <TopBar :selected-tab="selectedTopTab" @change-tab="selectedTopTab=$event"/>
    <router-view></router-view>
    <TabBar :selected-tab="selectedTab"/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader/";
import TopBar from "@/components/TopBar/";
import TabBar from "@/components/TabBar/";

export default {
  name: "Movie",
  data() {
    return {
      selectedTopTab: ".n-hot",
      selectedTab: ".movie"
    };
  },
  components: {
    AppHeader,
    TopBar,
    TabBar
  }
};
</script>

<style lang="stylus" scoped>
.movie {
}
</style>

