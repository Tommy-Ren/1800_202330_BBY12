
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

let selectedTags = [];

// Function to render the tags
function renderTags(posts) {
  // Get all unique tags
  const tags = [...new Set(posts.map(post => post.tag))];

  // Get the container for tags
  const tagsContainer = document.querySelector('.tags-container');

  // Clear out any existing content
  tagsContainer.innerHTML = '';

  // Add the tags to the container
  tags.forEach(tag => {
    const tagElement = document.createElement('button');
    tagElement.textContent = tag;
    tagElement.classList.add('tag-button'); 
    tagElement.addEventListener('click', () => {
      if (selectedTags.includes(tag)) {
        // If the tag is already selected, deselect it
        selectedTags = selectedTags.filter(t => t !== tag);
        tagElement.style.backgroundColor = 'orange'; 
      } else {
        // If the tag is not selected, select it
        selectedTags.push(tag);
        tagElement.style.backgroundColor = 'green'; 
      }
      filterPostsByTag(selectedTags, posts);
    });
    tagsContainer.appendChild(tagElement);
  });
}

// Function to filter posts by tag
function filterPostsByTag(tags, posts) {
  let filteredPosts;

  if (tags.length > 0) {
    // If there are selected tags, filter posts by those tags
    filteredPosts = posts.filter(post => tags.some(tag => post.tag === tag));
  } else {
    // If there are no selected tags, display all posts
    filteredPosts = posts;
  }

  // Clear the posts container
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';

  // Render the filtered posts
  filteredPosts.forEach(post => {
    const postCard = createPostCard(post);
    postsContainer.appendChild(postCard);
  });
}

// Modified renderPosts to also render popular posts
function renderPosts() {
  const postsContainer = document.getElementById('posts-container');
  const allPosts = []; 

  db.collection('posts').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const post = { id: doc.id, ...doc.data() };
      const postCard = createPostCard(post);
      postsContainer.appendChild(postCard);
      allPosts.push(post); 
    })
    renderPopularPosts(allPosts); 
    renderTags(allPosts); 
  }).catch(error => {
    console.error("Error fetching posts: ", error);
  });
}

// Call renderPosts to render posts when the page loads
document.addEventListener('DOMContentLoaded', renderPosts);