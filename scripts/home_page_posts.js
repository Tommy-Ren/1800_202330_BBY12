
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