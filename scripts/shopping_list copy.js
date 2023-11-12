
  const firebaseConfig = {
    // Your Firebase project configuration
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("User is signed in:", user.uid);
  } else {
    // No user is signed in.
    console.log("No user is signed in.");
  }
});


  document.getElementById("favoriteButton").addEventListener("click", function () {
    const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      const userId = user.uid;

      // Data to add to Firestore (replace with your actual data)
      const dataToAdd = {
        favorites: "Hello, Firestore!",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // Add data to Firestore under the user's ID
      db.collection("users").doc(userId).collection("data").add(dataToAdd)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    } else {
      // No user is signed in.
      console.log("No user is signed in.");
    }
  });

