function savePostToFirestore(title, price, location, tag, Like_Num, Dislike_Num, imageURL) {
    const postData = {
      title,
      price,
      location,
      tag,
      Like_Num: 0, 
      Dislike_Num: 0 
    };
  
    if (imageURL) {  // Only add the image property if imageURL is not null
      postData.image = imageURL;
    }
  
    return db.collection('Posts').add(postData);
  }

  
function uploadImageAndGetURL(imageFile) {
    const storageRef = firebase.storage().ref(`images/${imageFile.name}`);
    const uploadTask = storageRef.put(imageFile);
  
    return uploadTask.then(() => storageRef.getDownloadURL());
  }
  
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