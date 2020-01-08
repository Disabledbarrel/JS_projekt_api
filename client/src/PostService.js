// importerar http-klient
import axios from "axios";

// url för proxy
const url = "http://localhost:5000/api/posts/";

// Skapar klass för CRUD
class PostService {
  // Get Posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          })) // loopar genom erhållen data
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // Create Post
  static insertPost(text) {
    return axios.post(url, {
      text
    });
  }

  // Update Post
  static updatePost(id) {
    return axios.put(`${url}${id}`);
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
