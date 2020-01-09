<template>
  <div class="container" v-if="shouldRender">
    <input type="text" id="update-post" v-model="text" placeholder="Uppdatera todo" required />
    <button v-on:click="updatePost(postId)">Uppdatera</button>
    <p class="error" v-if="updateError">{{ updateError }}</p>
  </div>
</template>

<script>
import PostService from "../PostService"; // importerar service-klassen

export default {
  name: "UpdatePostComponent",
  props: ["shouldRender", "postId"],
  data() {
    return {
      text: "",
      updateError: ""
    };
  },
  methods: {
    async updatePost(id) {
      if (this.text != "") {
        await PostService.updatePost(id, this.text);
        this.$emit("update-post");
        this.updateError = "";
        this.text = "";
      } else {
        this.updateError = "Du får inte lägga till en tom todo";
      }
    }
  }
};
</script>
