<template>
  <div class="child-container" v-if="shouldRender">
    <div class="update-box">
      <input
        type="text"
        id="update-post"
        v-model="text"
        placeholder="Uppdatera todo"
        required
      />
      <button id="done" v-on:click="updatePost(postId)">
        <i class="fas fa-sync-alt"></i>
      </button>
      <button id="abort" v-on:click="hideUpdateField">
        <i class="fas fa-ban"></i>
      </button>
      <p class="error" v-if="updateError">{{ updateError }}</p>
    </div>
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
    },
    setText(text) {
      this.text = text;
    },
    hideUpdateField() {
      this.$emit("hide-update");
    }
  }
};
</script>

<!-- CSS för denna komponent -->
<style scoped>
.child-container {
  z-index: 3;
  width: 350px;
  height: 100px;
  background: rgb(240, 235, 227);
  margin: auto auto;
  position: relative;
  bottom: 200px;
  right: 0px;
  border-color: rgb(54, 53, 53);
  border-radius: 4px;
  border: 1px solid;
  color: rgb(54, 53, 53);
  font-family: "Montserrat", sans-serif;
}
input[type="text"] {
  border: none;
  border-radius: 4px;
  font-family: inherit;
  padding: 5px;
  margin-right: 15px;
}
button {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  border: none;
  font-family: inherit;
}
button:focus {
  outline: none;
  background: rgb(197, 191, 181);
}
#done {
  background: rgb(62, 112, 62);
  width: 30px;
  color: rgb(255, 253, 249);
  margin-right: 10px;
}
#abort {
  background: red;
  width: 30px;
  color: rgb(255, 253, 249);
  margin-right: 10px;
}
.update-box {
  width: 300px;
  margin: auto auto;
  margin-top: 30px;
}
.error {
  color: red;
}
</style>
