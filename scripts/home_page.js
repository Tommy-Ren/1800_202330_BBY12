
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
  likeButton.textContent = `👍 ${post.like_Num}`; 
  attachLikeButtonListener(likeButton, post.id);

  const dislikeButton = document.createElement('button');
  dislikeButton.className = 'dislike-button';
  dislikeButton.textContent = `👎 ${post.dislike_Num}`; 
  attachDislikeButtonListener(dislikeButton, post.id);
  // Append everything to postCard
  postActions.append(likeButton, dislikeButton);
  postContent.append(postTitle, postDescription, postActions);
  postCard.append(postImage, postContent);

  return postCard;
}

function attachLikeButtonListener(likeButton, postId) {
  likeButton.addEventListener('click', function() {
    const postRef = db.collection('posts').doc(postId);
    return db.runTransaction((transaction) => {
      return transaction.get(postRef).then((postDoc) => {
        if (!postDoc.exists) {
          throw "Document does not exist!";
        }

        // Compute the new like count
        let newLikeCount = (postDoc.data().like_Num || 0) + 1;

        // Update the Firestore document
        transaction.update(postRef, { like_Num: newLikeCount });

        // Update the button text
        likeButton.textContent = `👍 ${newLikeCount}`;
      });
    }).catch((error) => {
      console.error("Transaction failed: ", error);
    });
  });
}

function attachDislikeButtonListener(dislikeButton, postId) {
  dislikeButton.addEventListener('click', function() {
    const postRef = db.collection('posts').doc(postId);
    return db.runTransaction((transaction) => {
      return transaction.get(postRef).then((postDoc) => {
        if (!postDoc.exists) {
          throw "Document does not exist!";
        }

        // Compute the new dislike count
        let newDislikeCount = (postDoc.data().dislike_Num || 0) + 1;

        // Update the Firestore document
        transaction.update(postRef, { dislike_Num: newDislikeCount });

        // Update the button text
        dislikeButton.textContent = `👎 ${newDislikeCount}`;
      });
    }).catch((error) => {
      console.error("Transaction failed: ", error);
    });
  });
}

function savePostToFirestore(title, description, imageURL) {
  const postData = {
    title,
    description,
    like_Num: 0, 
    dislike_Num: 0 
  };

  if (imageURL) {  // Only add the image property if imageURL is not null
    postData.image = imageURL;
  }

  return db.collection('posts').add(postData);
}

  // Function to render the popular posts
function renderPopularPosts(posts) {
    // Sort the posts by like_Num in descending order
    const sortedPosts = posts.sort((a, b) => b.like_Num - a.like_Num);
  
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
  
    db.collection('posts').get().then((querySnapshot) => {
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