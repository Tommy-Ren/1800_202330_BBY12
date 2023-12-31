var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get().then(userDoc => {
                //get the data fields of the user
                var userName = userDoc.data().name;
                var userLocation = userDoc.data().street + ", " + userDoc.data().zip;
                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                    document.getElementById("nameInput2").innerText = userName;
                    document.getElementById("userLocation").innerText = userLocation;
                }
            })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();