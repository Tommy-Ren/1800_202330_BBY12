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
function uploadImageAndGetURL(imageFile) {
  const storageRef = firebase.storage().ref(`images/${imageFile.name}`);
  const uploadTask = storageRef.put(imageFile);

  return uploadTask.then(() => storageRef.getDownloadURL());
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