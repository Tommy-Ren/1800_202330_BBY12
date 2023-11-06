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