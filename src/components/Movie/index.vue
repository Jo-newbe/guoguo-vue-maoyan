<template>
  <div>
    <AppHeader/>
    <TopBar/>
  </div>
</template>

<script>
import AppHeader from "../AppHeader/";
import TopBar from "../TopBar/";

export default {
  name: "Movie",
  components: {
    AppHeader,
    TopBar
  }
};
</script>
