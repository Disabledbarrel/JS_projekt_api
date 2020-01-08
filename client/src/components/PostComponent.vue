<template>
  <div class="container">
    <h1>Middagsplanering</h1>
    <div class="create-post">
      <label for="create-post">Lägg till todo:</label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Lägg till todo"
      />
      <button v-on:click="createPost">Lägg till</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
        <p class="text">{{ post.text }}</p>
        <button v-on:click="deletePost(post._id)">Radera</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService"; // importerar service-klassen

export default {
  name: "PostComponent",
  // Data associerad med komponenten
  data() {
    return {
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts(); // Läser in från vår skapade service-klass
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts(); // Läser in från vår skapade service-klass
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts(); // Läser in från vår skapade service-klass
    },
    async updatePost(id) {
      await PostService.updatePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- CSS för denna komponent -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
