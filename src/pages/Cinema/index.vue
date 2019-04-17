<template>
  <div>
    <h1>Cinema</h1>
    <TabBar :selected-tab="selectedTab"/>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "Cinema",
  data() {
    return {
      selectedTab: ".cinema"
    };
  },
  components: {
    TabBar
  }
};
</script>