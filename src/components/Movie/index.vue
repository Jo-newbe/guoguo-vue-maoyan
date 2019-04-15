<template>
  <div>
    <AppHeader/>
    <TopBar/>
    <HottingList/>
    <TabBar/>
  </div>
</template>

<script>
import AppHeader from "../AppHeader/";
import TopBar from "../TopBar/";
import TabBar from "../TabBar/";
import HottingList from "../HottingList";

export default {
  name: "Movie",
  components: {
    AppHeader,
    TopBar,
    HottingList,
    TabBar
  }
};
</script>
