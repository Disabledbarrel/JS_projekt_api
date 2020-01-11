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
        required
      />
      <button id="add" v-on:click="createPost">Lägg till</button>
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
        <p class="text">
          <i class="fas fa-thumbtack"></i>
          {{ post.text }}
        </p>
        <div class="buttons">
          <button class="check" v-on:click="deletePost(post._id)">
            <i class="fas fa-check-circle"></i>
          </button>
          <button
            class="edit"
            v-on:click="toggleBottomBar(post._id, post.text)"
          >
            <i class="far fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
    <UpdatePostComponent
      ref="updatePostComponent"
      v-bind:should-render="showBottomBar"
      v-bind:post-id="currentPostId"
      @update-post="read"
      @hide-update="hideInput"
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
    },
    hideInput() {
      this.showBottomBar = false;
    }
  }
};
</script>

<!-- CSS för denna komponent -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

.container {
  color: rgb(54, 53, 53);
  width: 400px;
  height: auto;
  margin: auto auto;
  padding-top: 200px;
  font-family: "Montserrat", sans-serif;
}
h1 {
  margin-bottom: 5px;
  text-align: center;
}
button {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid;
  background: rgb(240, 235, 227);
  font-family: inherit;
}
button:focus {
  outline: none;
  background: rgb(197, 191, 181);
}
.text {
  padding: 10px;
  grid-column: 1;
}
input[type="text"] {
  border: none;
  border-radius: 4px;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
input[type="text"]:focus {
  outline: rgb(54, 53, 53);
}
.create-post {
  text-align: right;
}
#add {
  border-color: rgb(141, 135, 135);
}
.post {
  display: grid;
  grid-template: 1fr 1fr;
  text-align: left;
  font-weight: 700;
  align-items: center;
}
.buttons {
  grid-column: 2;
  grid-row: 1;
  text-align: right;
}
.post button {
  margin-left: 5px;
  font-size: 15px;
  padding: 5px;
  width: 50px;
  border-color: rgb(141, 135, 135);
}
.check {
  padding: 0;
  width: 30px;
  margin: 0;
  color: green;
  border-color: rgb(141, 135, 135);
}
.edit {
  padding: 0;
  width: 30px;
  margin: 0;
  border-color: rgb(141, 135, 135);
}
.error {
  color: red;
  text-align: center;
}
</style>
