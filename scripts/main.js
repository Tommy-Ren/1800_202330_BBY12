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