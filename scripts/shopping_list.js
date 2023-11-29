
function renderFavoritePosts(userId) {
  const favoritesContainer = document.getElementById('favorite-posts-container');
  favoritesContainer.innerHTML = ''; // Clear the container

  // Get the reference to the user's document
  const userRef = db.collection('users').doc(userId);

  // Fetch the user's favorites
  userRef.get().then((doc) => {
    if (doc.exists) {
      const userFavorites = doc.data().favorites || [];

      // Fetch each favorite post by ID and create a post card
      userFavorites.forEach((postId) => {
        const postRef = db.collection('posts').doc(postId);
        postRef.get().then((postDoc) => {
          if (postDoc.exists) {
            const postCard = createFavorPostCard(postDoc.data());
            favoritesContainer.appendChild(postCard);
        
            // Get the delete button for this post
            const deleteButton = postCard.querySelector('.delete-button');
            // Set up the delete button
            setupDeleteButton(deleteButton, postId, postCard);
          } else {
            console.log(`Post not found: ${postId}`);
          }
        }).catch(error => {
          console.error("Error fetching post: ", error);
        });
      });
    } else {
      console.log('User document not found.');
    }
  }).catch(error => {
    console.error("Error fetching user's favorites: ", error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      renderFavoritePosts(user.uid);
    } else {
      console.log('User must be signed in to view favorites.');
    }
  });
});

function createFavorPostCard(post) {

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
  postDescription.classList.add('hidden');

  const postTags = document.createElement('p');
  postTags.className = 'post-tags';
  postTags.textContent = post.tag || 'No tag';

  const postPrice = document.createElement('p');
  postPrice.className = 'post-price';
  postPrice.textContent = `Price: $${post.price.toFixed(2)}`;

  const postExpiration = document.createElement('p');
  postExpiration.className = 'post-expiration';
  postExpiration.textContent = `Expires on: ${new Date(post.expirationDate).toLocaleDateString()}`;
  postExpiration.classList.add('hidden');

  const postStoreName = document.createElement('p');
  postStoreName.className = 'post-store-name';
  postStoreName.textContent = `Store: ${post.store_Name}`;
  postStoreName.classList.add('hidden');

  const postStoreLocation = document.createElement('p');
  postStoreLocation.className = 'post-store-location';
  postStoreLocation.textContent = `Location: ${post.store_Address}`;
  postStoreLocation.classList.add('hidden');

  const postActions = document.createElement('div');
  postActions.className = 'post-actions';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  setupDeleteButton(deleteButton, post.id);
  deleteButton.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  postContent.addEventListener('click', function () {
    postDescription.classList.toggle('hidden');
    postExpiration.classList.toggle('hidden');
    postStoreName.classList.toggle('hidden');
    postStoreLocation.classList.toggle('hidden');
    postDescription.classList.toggle('show');
    postExpiration.classList.toggle('show');
    postStoreName.classList.toggle('show');
    postStoreLocation.classList.toggle('show');
  });

  // Append everything to postCard
  postActions.append(deleteButton);
  postContent.append(postTags, postTitle, postPrice, postExpiration, postStoreName, postStoreLocation, postDescription, postActions);
  postCard.append(postImage, postContent);

  return postCard;
}

function setupDeleteButton(deleteButton, postId, postCard) {
  const user = firebase.auth().currentUser;

  if (user) {
    const userId = user.uid;
    const userRef = db.collection('users').doc(userId);

    // Event listener for clicks to remove from favorites
    deleteButton.addEventListener('click', function() {
      return db.runTransaction((transaction) => {
        return transaction.get(userRef).then((userDoc) => {
          if (!userDoc.exists) {
            throw "User document does not exist!";
          }

          let userFavorites = userDoc.data().favorites || [];
          const favoriteIndex = userFavorites.indexOf(postId);
          if (favoriteIndex !== -1) {
            userFavorites.splice(favoriteIndex, 1); // Remove from favorites
            deleteButton.textContent = 'Removed from Favorites';

            // Remove the post card from the DOM
            postCard.remove();
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
    deleteButton.disabled = true;
  }
}