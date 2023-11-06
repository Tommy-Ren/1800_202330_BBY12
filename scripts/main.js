function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
        }
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
getNameFromAuth(); //run the function

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
