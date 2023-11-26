var ImageFile;
function listenFileSelect() {
  // listen for file selection
  var fileInput = document.getElementById("pic-input"); // pointer #1
  const image = document.getElementById("pic-goes-here"); // pointer #2

  // When a change happens to the File Chooser Input
  fileInput.addEventListener('change', function (e) {
    ImageFile = e.target.files[0];   //Global variable
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob; // Display this image
  })
}

function savePost() {
  //alert("SAVE POST is triggered");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here. 
      var title = document.getElementById("title-input").value;
      var desc = document.getElementById("desc-input").value;
      var price = parseFloat(Math.abs(document.getElementById("price-input").value.toFixed(2)));
      var tag = document.getElementById("tag-input").value;
      var date = document.getElementById("date-input").value;
      var store_Name = document.getElementById("store-name-input").value;
      var store_Address = document.getElementById("store-address-input").value;
      if (!title) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Title is required.",
        });
        return;
      }
      if (!price) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Price is required.",
        });
        return;
      }
      if (isNaN(price)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Price should be a number.",
        });
        return; // Exit the function if price is not a number
      }
      if (!store_Name) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Store name is required.",
        });
        return;
      }
      if (!store_Address) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Store address is required.",
        });
        return;
      }
      db.collection("posts").add({
        owner: user.uid,
        title: title,
        description: desc,
        price: price,
        tag: tag,
        date: date,
        store_Name: store_Name,
        store_Address: store_Address,
        like_Num: 0,
        dislike_Num: 0,
        last_updated: firebase.firestore.FieldValue
          .serverTimestamp() //current system time
      }).then(doc => {
        uploadPic(doc.id);
      })
    } else {
      // No user is signed in.
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Need authentication to save post!",
      });
    }
  });
}

//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
// 
// This function is called AFTER the post has been created, 
// and we know the post's document id.
//------------------------------------------------
function uploadPic(postDocID) {
  var storageRef = storage.ref("images/" + postDocID + ".jpg");

  storageRef.put(ImageFile)   //global variable ImageFile

    // AFTER .put() is done
    .then(function () {
      storageRef.getDownloadURL()

        // AFTER .getDownloadURL is done
        .then(function (url) { // Get URL of the uploaded file

          // Now that the image is on Storage, we can go back to the
          // post document, and update it with an "image" field
          // that contains the url of where the picture is stored.
          db.collection("posts").doc(postDocID).update({
            "image": url // Save the URL into users collection
          })
            // AFTER .update is done
            .then(function () {
              // One last thing to do:
              // save this postID into an array for the OWNER
              // so we can show "my posts" in the future
              savePostIDforUser(postDocID);
            })
        })
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "error uploading to cloud storage!",
      });
    })
}

//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function savePostIDforUser(postDocID) {
  firebase.auth().onAuthStateChanged(user => {
    console.log("user id is: " + user.uid);
    console.log("postdoc id is: " + postDocID);
    db.collection("users").doc(user.uid).update({
      myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Your post upload successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error: " + error,
        });
      });
  })
}

listenFileSelect();