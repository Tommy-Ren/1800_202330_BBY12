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
  postImage.src = post.image; // Replace 'image' with the actual field name from your Firestore document
  postImage.alt = 'Post Image';

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postTitle = document.createElement('h2');
  postTitle.className = 'post-title';
  postTitle.textContent = post.title; // Replace 'title' with the actual field name from your Firestore document

  const postDescription = document.createElement('p');
  postDescription.className = 'post-description';
  postDescription.textContent = post.description; // Replace 'description' with the actual field name from your Firestore document

  const postActions = document.createElement('div');
  postActions.className = 'post-actions';

  const likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.textContent = `👍 ${post.Like_Num}`; 

  const dislikeButton = document.createElement('button');
  dislikeButton.className = 'dislike-button';
  dislikeButton.textContent = `👎 ${post.Dislike_Num}`; 

  // Append everything to postCard
  postActions.append(likeButton, dislikeButton);
  postContent.append(postTitle, postDescription, postActions);
  postCard.append(postImage, postContent);

  return postCard;
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
