import { ref } from "vue";
import { doc, getDoc } from "firebase/firestore";  // Import Firestore functions
import { db } from "../firebase/config";  // Adjust the path if needed

let getPost = (id) => {
  let error = ref('');
  let post = ref(null);

  let load = async () => {
    try {
      // Optionally, add a delay to simulate loading if needed
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get a reference to the document using the provided ID
      const docRef = doc(db, "posts", id);  // 'posts' is the Firestore collection name
      const docSnap = await getDoc(docRef);  // Fetch the document

      if (!docSnap.exists()) {
        throw new Error('Post not found');
      }

      // Set the post data to the response from Firestore
      post.value = { ...docSnap.data(), id: docSnap.id };

    } catch (err) {
      error.value = err.message;  // Handle any errors
    }
  };

  return { post, error, load };
};

export default getPost;
