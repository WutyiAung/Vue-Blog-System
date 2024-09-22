<template>
  <form @submit.prevent="addPost">
    <label>Title</label>
    <input type="text" required v-model="title">

    <label>Body</label>
    <textarea required v-model="body"></textarea>

    <label>Tags (hit enter to add a tag)</label>
    <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown()">
    
    <button>Add post</button>
    
    <div v-for="tag in tags" :key="tag" class="pill">
      {{ tag }}
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore methods
import { db } from '../firebase/config';  // Import the initialized Firestore database

export default {
  setup() {
    let router = useRouter();
    let title = ref("");
    let body = ref("");
    let tag = ref("");
    let tags = ref([]);

    // Function to handle adding tags
    let handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value);
      }
      tag.value = "";
    };

    // Function to add the post to Firestore
    let addPost = async () => {
      try {
        // Add a new document to the 'posts' collection
        await addDoc(collection(db, "posts"), {
          title: title.value,
          body: body.value,
          tags: tags.value,
          createdAt: new Date()
        });

        // Redirect the user to the home page after adding the post
        router.push("/");
      } catch (err) {
        console.error("Error adding post: ", err.message);
      }
    };

    return { title, body, tag, handleKeydown, tags, addPost };
  }
};
</script>

<style>
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px;
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>
