<template>
  <div class="container" v-if="shouldRender">
    <input
      type="text"
      id="update-post"
      v-model="text"
      placeholder="Uppdatera till todo"
    />
    <button v-on:click="updatePost(postId)">Uppdatera</button>
  </div>
</template>

<script>
import PostService from "../PostService"; // importerar service-klassen

export default {
  name: "UpdatePostComponent",
  props: ["shouldRender", "postId"],
  data() {
    return {
      text: ""
    };
  },
  methods: {
    async updatePost(id) {
      await PostService.updatePost(id, this.text);
      this.$emit("update-post");
    }
  }
};
</script>
