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
  postDescription.classList.add('hidden');

  const postTags = document.createElement('p');
  postTags.className = 'post-tags';
  postTags.textContent = post.tag || 'No tag';

  const postPrice = document.createElement('p');
  postPrice.className = 'post-price';
  postPrice.textContent = `Price: $${post.price}`; 

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

  const likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.textContent = `👍 ${post.like_Num}`;
  likeButton.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  const dislikeButton = document.createElement('button');
  dislikeButton.className = 'dislike-button';
  dislikeButton.textContent = `👎 ${post.dislike_Num}`;
  dislikeButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
  });
  setupLikeDislikeButtons(likeButton, dislikeButton, post.id);

  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-button';
  favoriteButton.textContent = '⭐ Favorite';
  setupFavoriteButton(favoriteButton, post.id);
  favoriteButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
  });

  postContent.addEventListener('click', function() {
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
  postActions.append(likeButton, dislikeButton, favoriteButton);
  postContent.append(postTitle, postTags, postPrice, postExpiration, postDescription, postStoreName, postStoreLocation, postActions);
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
function savePostToFirestore(title, description, imageURL, tag, price, expirationDate) {
  const postData = {
    title,
    description,
    like_Num: 0,
    dislike_Num: 0,
    tag: tag,
    price: price || 0.0, 
    expirationDate: expirationDate || null, 
    store_Name: store_Name || 'Unknown Store',
    store_Address: store_Address || 'Unknown Location'
  };

  if (imageURL) {
    postData.image = imageURL;
  }

  return db.collection('posts').add(postData);
}
  
  