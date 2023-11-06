//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyA_vnATk5-BXC-Wj9C8Q9cZsN7nWHx7Vd0",
    authDomain: "comp1800bby12-20ef4.firebaseapp.com",
    projectId: "comp1800bby12-20ef4",
    storageBucket: "comp1800bby12-20ef4.appspot.com",
    messagingSenderId: "731770957175",
    appId: "1:731770957175:web:826114a76a6970f4a84572"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function uploadImageAndGetURL(imageFile) {
    const storageRef = firebase.storage().ref(`images/${imageFile.name}`);
    const uploadTask = storageRef.put(imageFile);
  
    return uploadTask.then(() => storageRef.getDownloadURL());
  }
  
  // Function to save the post data to Firestore
  function savePostToFirestore(title, description, imageURL) {
    return db.collection('Posts').add({
      title,
      description,
      image: imageURL,
      Like_Num: 0, 
      Dislike_Num: 0 
    });
  }
  
// Function to create a post card
function createPopularPostCard(post) {
    const postElement = document.createElement('div');
    postElement.className = 'popular-post';
  
    const imageElement = document.createElement('img');
    imageElement.src = post.image;
    imageElement.className = 'card-img-top';
    imageElement.alt = 'Description of Image';
  
    const bodyElement = document.createElement('div');
    bodyElement.className = 'card-body';
  
    const titleElement = document.createElement('h5');
    titleElement.className = 'card-title';
    titleElement.textContent = post.title;
  
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'card-text';
    descriptionElement.textContent = post.description;
  
    // Append all elements to the postElement
    bodyElement.appendChild(titleElement);
    bodyElement.appendChild(descriptionElement);
    postElement.appendChild(imageElement);
    postElement.appendChild(bodyElement);
  
    return postElement;
  }

  // Function to render the popular posts
function renderPopularPosts(posts) {
    // Sort the posts by Like_Num in descending order
    const sortedPosts = posts.sort((a, b) => b.Like_Num - a.Like_Num);
  
    // Select a number of top posts to be popular
    const popularPosts = sortedPosts.slice(0, 5); // Adjust the number as needed
  
    // Get the container for popular posts
    const popularPostsContainer = document.querySelector('.popular-posts-container');
  
    // Clear out any existing content
    popularPostsContainer.innerHTML = '';
  
    // Add the popular posts to the container
    popularPosts.forEach(post => {
      const postCard = createPopularPostCard(post);
      popularPostsContainer.appendChild(postCard);
    });
  }
  
  // Modified renderPosts to also render popular posts
  function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    const allPosts = []; // Array to hold all posts for sorting later
  
    db.collection('Posts').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, ...doc.data() };
        const postCard = createPostCard(post);
        postsContainer.appendChild(postCard);
        allPosts.push(post); // Push the post to the array
      });
      renderPopularPosts(allPosts); // Render the popular posts after all posts have been processed
    }).catch(error => {
      console.error("Error fetching posts: ", error);
    });
  }
  
  // Call renderPosts to render posts when the page loads
  document.addEventListener('DOMContentLoaded', renderPosts);
function createPostCard(post) {
  const postCard = document.createElement('div');
  postCard.className = 'post-card';

  const postImage = document.createElement('img');
  postImage.className = 'post-image';
  postImage.src = post.image; 
  postImage.alt = 'Post Image';

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postTitle = document.createElement('h2');
  postTitle.className = 'post-title';
  postTitle.textContent = post.title; 

  const postDescription = document.createElement('p');
  postDescription.className = 'post-description';
  postDescription.textContent = post.description; 

  const postActions = document.createElement('div');
  postActions.className = 'post-actions';

  const likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.textContent = `👍 ${post.Like_Num}`; 
  attachLikeButtonListener(likeButton, post.id);

  const dislikeButton = document.createElement('button');
  dislikeButton.className = 'dislike-button';
  dislikeButton.textContent = `👎 ${post.Dislike_Num}`; 

  // Append everything to postCard
  postActions.append(likeButton, dislikeButton);
  postContent.append(postTitle, postDescription, postActions);
  postCard.append(postImage, postContent);

  return postCard;
}

function attachLikeButtonListener(likeButton, postId) {
  likeButton.addEventListener('click', function() {
    // Reference to the Firestore document for the post
    const postRef = db.collection('Posts').doc(postId);

    // Run a transaction to ensure that the like count is incremented atomically
    return db.runTransaction((transaction) => {
      return transaction.get(postRef).then((postDoc) => {
        if (!postDoc.exists) {
          throw "Document does not exist!";
        }

        // Compute the new like count
        let newLikeCount = (postDoc.data().Like_Num || 0) + 1;

        // Update the Firestore document
        transaction.update(postRef, { Like_Num: newLikeCount });

        // Update the button text
        likeButton.textContent = `👍 ${newLikeCount}`;
      });
    }).catch((error) => {
      console.error("Transaction failed: ", error);
    });
  });
}

// Function to fetch posts and render them
function renderPosts() {
  const postsContainer = document.getElementById('posts-container');

  db.collection('Posts').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postCard = createPostCard(post);
      postsContainer.appendChild(postCard);
    });
  }).catch(error => {
    console.error("Error fetching posts: ", error);
  });
}

// Call renderPosts to render posts when the page loads
document.addEventListener('DOMContentLoaded', renderPosts);
document.getElementById('post-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the title and description from the form
  const title = document.getElementById('title-input').value;
  const description = document.getElementById('description-input').value;

  // Save the post to Firestore without an image URL
  savePostToFirestore(title, description, null)
    .then(() => {
      // Clear the form after saving
      document.getElementById('post-form').reset();

      // Optionally re-render posts if needed
      renderPosts();
    })
    .catch((error) => {
      console.error("Error adding post: ", error);
    });
});
