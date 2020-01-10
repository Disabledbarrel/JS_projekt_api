<template>
  <div id="app">
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from "./components/PostComponent.vue";

export default {
  name: "app",
  components: {
    PostComponent
  }
};
</script>

<!-- Nollställer marginaler mm-->
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
#app {
  width: 1200px;
  background-image: url("./assets/background.jpg");
  height: 803px;
  margin: auto auto;
}
</style>
