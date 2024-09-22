import { ref } from 'vue';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

let getPosts = () => {
  let posts = ref([]);  // To store the fetched posts
  let error = ref("");  // To store any errors

  let load = async () => {
    try {
      // Create a query to fetch posts ordered by 'createdAt' in descending order
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("created_at", "desc")  // Ensure 'createdAt' is the field used for sorting
      );

      // Fetch the documents
      const querySnapshot = await getDocs(postsQuery);

      // Parse the documents and update the 'posts' ref
      posts.value = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }; // Include the doc ID as well
      });

    } catch (err) {
      // Catch and store any errors
      error.value = err.message;
    }
  };

  // Return the posts and error refs along with the load function
  return { posts, error, load };
};

export default getPosts;
