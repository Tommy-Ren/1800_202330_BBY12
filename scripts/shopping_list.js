
// Function to create a post card
function createPopularPostCard(post) {
    // const postElement = document.createElement('div');
    // postElement.className = 'popular-post';
  
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

  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-button';
  favoriteButton.textContent = `👍 ${post.favorites}`; 
  attachFavoriteButtonListener(favoriteButton, post.id);

  // Append everything to postCard
  postActions.append(likeButton, dislikeButton, favoriteButton);
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

function attachFavoriteButtonListener(favoriteButton, postId) {
    favoriteButton.addEventListener('click', function() {
      const userFav = db.collection('users').doc(favorites);
      const postRef = db.collection('posts').doc(postId);
      return db.runTransaction((transaction) => {
        return transaction.get(postRef).then((postDoc) => {
          if (!postDoc.exists) {
            throw "Document does not exist!";
          }
  
          // add to user favorites
          let newFavorite = (postDoc.data().favorites);
  
          // Update the Firestore document
          //transaction.update(userFav, { favorites: postRef });
  
          // Update the button text
          favoriteButton.textContent = `👍 ${favorites}`;
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

// function saveUserFavoriteToFirestore(favorites) {
//     const postRef = db.collection('posts').doc(postId);
//     const userFav = {
//       favorites: postRef
//     };
  
//     return db.collection('users').add();
//   }
  

// Call renderPosts to render posts when the page loads
document.addEventListener('DOMContentLoaded', renderPosts);