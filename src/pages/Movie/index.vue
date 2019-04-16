<template>
  <div class="movie">
    <AppHeader/>
    <TopBar/>
    <router-view></router-view>
    <TabBar/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader/";
import TopBar from "@/components/TopBar/";
import TabBar from "@/components/TabBar/";

export default {
  name: "Movie",
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

