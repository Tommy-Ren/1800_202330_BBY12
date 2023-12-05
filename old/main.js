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

/*function uploadPosts() {
    //define a variable for the collection you want to create in Firestore to populate data
    var postsInfo = db.collection("posts");

    hikesRef.add({
        code: "BBY01",
        name: "Burnaby Lake Park Trail", //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
                details: "A lovely place for lunch walk",
        length: 10,          //number value
        hike_time: 60,       //number value
        lat: 49.2467097082573,
        lng: -122.9187029619698,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}





// function savePostToFirestore(title, price, location, tag, Like_Num, Dislike_Num, imageURL) {
//     const postData = {
//       title,
//       price,
//       location,
//       tag,
//       Like_Num: 0, 
//       Dislike_Num: 0 
//     };
  
//     if (imageURL) {  // Only add the image property if imageURL is not null
//       postData.image = imageURL;
//     }
  
//     return db.collection('Posts').add(postData);
//   }

  
// function uploadImageAndGetURL(imageFile) {
//     const storageRef = firebase.storage().ref(`images/${imageFile.name}`);
//     const uploadTask = storageRef.put(imageFile);
  
//     return uploadTask.then(() => storageRef.getDownloadURL());
//   }
  
//   // Function to save the post data to Firestore
//   function savePostToFirestore(title, description, imageURL) {
//     return db.collection('Posts').add({
//       title,
//       description,
//       image: imageURL,
//       Like_Num: 0, 
//       Dislike_Num: 0 
//     });
//   }
*/



// Now you can use ref, uploadBytes, getDownloadURL

  /*document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get the title, description, and image file from the form
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const imageFile = document.getElementById('image-input').files[0]; // This is the image file
  
    // Check if an image was selected
    if (imageFile) {
      // First upload the image
      uploadImageAndGetURL(imageFile).then((imageURL) => {
        // Then save the post with the image URL
        savePostToFirestore(title, description, imageURL).then(() => {
          // Clear the form after saving
          document.getElementById('post-form').reset();
  
          // Optionally re-render posts if needed
          renderPosts();
        });
      }).catch((error) => {
        console.error("Error uploading image or adding post: ", error);
      });
    } else {
      // Save the post without an image URL if no image was selected
      savePostToFirestore(title, description, null).then(() => {
        // Clear the form after saving
        document.getElementById('post-form').reset();
  
        // Optionally re-render posts if needed
        renderPosts();
      }).catch((error) => {
        console.error("Error adding post: ", error);
      });
    }
  });
  function uploadImageAndGetURL(imageFile) {
    // Assume 'firebase' is already initialized and 'storage' is firebase.storage()
    var storageRef = firebase.storage().ref('images/' + imageFile.name);

    // Upload the file to the path 'images/' in your Firebase Storage
    return storageRef.put(imageFile).then(function(snapshot) {
        // After the file is uploaded, get the download URL
        return storageRef.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL); // Log the URL
            return downloadURL; // This URL is what you will save to Firestore
        });
    }).catch(function(error) {
        // Handle any errors here
        console.error("Error uploading file: ", error);
        return null; // Return null if there's an error
    });
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
*/