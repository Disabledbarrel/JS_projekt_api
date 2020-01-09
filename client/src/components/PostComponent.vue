<template>
  <div class="container">
    <h1>Middagsplanering</h1>
    <div class="create-post">
      <label for="create-post">Lägg till todo:</label>
      <input type="text" id="create-post" v-model="text" placeholder="Lägg till todo" required />
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
        <button v-on:click="deletePost(post._id)">
          <i class="fas fa-check-circle"></i>
        </button>
        <button v-on:click="toggleBottomBar(post._id, post.text)">
          <i class="far fa-edit"></i>
        </button>
      </div>
    </div>
    <UpdatePostComponent
      ref="updatePostComponent"
      v-bind:should-render="showBottomBar"
      v-bind:post-id="currentPostId"
      @update-post="read"
    />
  </div>
</template>

<script>
import PostService from "../PostService"; // importerar service-klassen
import UpdatePostComponent from "./UpdatePostComponent";

export default {
  name: "PostComponent",
  components: {
    UpdatePostComponent
  },
  // Data associerad med komponenten
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      showBottomBar: false,
      currentPostId: 0 // startvärde
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
      if (this.text != "") {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts(); // Läser in från vår skapade service-klass
        this.error = "";
        this.text = "";
      } else {
        this.error = "Du får inte lägga till en tom todo";
      }
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts(); // Läser in från vår skapade service-klass
    },
    toggleBottomBar(id, text) {
      this.showBottomBar = !this.showBottomBar;
      this.currentPostId = id;
      this.$refs.updatePostComponent.setText(text);
    },
    async read() {
      this.posts = await PostService.getPosts(); // Läser in från vår skapade service-klass
      this.showBottomBar = false;
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
button {
  cursor: pointer;
}
</style>
