<template>
  <div>
    <AppHeader/>
    <TopBar/>
    <TabBar/>
  </div>
</template>

<script>
import AppHeader from "../AppHeader/";
import TopBar from "../TopBar/";
import TabBar from "../TabBar/";

export default {
  name: "Movie",
  components: {
    AppHeader,
    TopBar,
    TabBar
  }
};
</script>
