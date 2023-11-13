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

  const dislikeButton = document.createElement('button');
  dislikeButton.className = 'dislike-button';
  dislikeButton.textContent = `👎 ${post.dislike_Num}`;

  setupLikeDislikeButtons(likeButton, dislikeButton, post.id);

  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-button';
  favoriteButton.textContent = '⭐ Favorite';
  setupFavoriteButton(favoriteButton, post.id);

  // Append everything to postCard
  postActions.append(likeButton, dislikeButton, favoriteButton);
  postContent.append(postTitle, postDescription, postActions);
  postCard.append(postImage, postContent);

  return postCard;
}

function setupLikeDislikeButtons(likeButton, dislikeButton, postId) {
  likeButton.addEventListener('click', function() {
    updateLikeDislikeCount(postId, 'like_Num', likeButton);
  });

  dislikeButton.addEventListener('click', function() {
    updateLikeDislikeCount(postId, 'dislike_Num', dislikeButton);
  });
}

function updateLikeDislikeCount(postId, field, button) {
  const postRef = db.collection('posts').doc(postId);
  return db.runTransaction((transaction) => {
    return transaction.get(postRef).then((postDoc) => {
      if (!postDoc.exists) {
        throw "Document does not exist!";
      }

      // Compute the new count
      let newCount = (postDoc.data()[field] || 0) + 1;

      // Update the Firestore document
      transaction.update(postRef, { [field]: newCount });

      // Update the button text
      button.textContent = field === 'like_Num' ? `👍 ${newCount}` : `👎 ${newCount}`;
    });
  }).catch((error) => {
    console.error("Transaction failed: ", error);
  });
}

function setupFavoriteButton(favoriteButton, postId) {
  const user = firebase.auth().currentUser;

  if (user) {
    const userId = user.uid;
    const userRef = db.collection('users').doc(userId);

    // Initial check to set the state of the button
    userRef.get().then((userDoc) => {
      if (userDoc.exists) {
        let userFavorites = userDoc.data().favorites || [];
        if (userFavorites.includes(postId)) {
          favoriteButton.textContent = '✅ Favorited';
        } else {
          favoriteButton.textContent = '⭐ Favorite';
        }
      } else {
        console.error("User document does not exist!");
        favoriteButton.textContent = '⭐ Favorite';
      }
    }).catch((error) => {
      console.error("Error getting user favorites: ", error);
    });

    // Event listener for clicks to add/remove from favorites
    favoriteButton.addEventListener('click', function() {
      return db.runTransaction((transaction) => {
        return transaction.get(userRef).then((userDoc) => {
          if (!userDoc.exists) {
            throw "User document does not exist!";
          }

          let userFavorites = userDoc.data().favorites || [];
          const favoriteIndex = userFavorites.indexOf(postId);
          if (favoriteIndex === -1) {
            userFavorites.push(postId); // Add to favorites
            favoriteButton.textContent = '✅ Favorited';
          } else {
            userFavorites.splice(favoriteIndex, 1); // Remove from favorites
            favoriteButton.textContent = '⭐ Favorite';
          }

          // Update the user's favorites in Firestore
          transaction.update(userRef, { favorites: userFavorites });
        });
      }).catch((error) => {
        console.error("Transaction failed: ", error);
      });
    });

  } else {
    console.error('User must be signed in to modify favorites.');
    favoriteButton.disabled = true;
  }
}

function savePostToFirestore(title, description, imageURL) {
  const postData = {
    title,
    description,
    like_Num: 0,
    dislike_Num: 0
  };

  if (imageURL) {
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
