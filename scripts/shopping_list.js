
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
            const postCard = createPostCard(postDoc.data(), false);
            favoritesContainer.appendChild(postCard);
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
