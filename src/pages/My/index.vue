<template>
  <div>
    <h1>My</h1>
    <TabBar :selected-tab="selectedTab"/>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "My",
  data() {
    return {
      selectedTab: ".my"
    };
  },
  components: {
    TabBar
  }
};
</script>