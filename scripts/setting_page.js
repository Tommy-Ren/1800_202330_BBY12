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
                var userEmail = userDoc.data().email;
                var userCity = userDoc.data().city;
                var userProvince = userDoc.data().province;
                var userZIP = userDoc.data().zip;
                var userStreet = userDoc.data().street;

                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userEmail != null) {
                    document.getElementById("emailInput").value = userEmail;
                }
                if (userProvince != null) {
                    document.getElementById("provinceInput").value = userProvince;
                }
                if (userCity != null) {
                    document.getElementById("cityInput").value = userCity;
                }
                if (userZIP != null) {
                    document.getElementById("ZIPInput").value = userZIP;
                }
                if (userStreet != null) {
                    document.getElementById("StreetInput").value = userStreet;
                }
            })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('provinceInput').disabled = false;
    document.getElementById('cityInput').disabled = false;
    document.getElementById('ZIPInput').disabled = false;
    document.getElementById('StreetInput').disabled = false;
}

function saveUserInfo() {
    //a) get user entered values
    userCity = document.getElementById('cityInput').value;
    userProvince = document.getElementById('provinceInput').value;
    userZIP = document.getElementById('ZIPInput').value;
    userStreet = document.getElementById('StreetInput').value;

    //b) update user's information in Firestore
    currentUser.update({
        city: userCity,
        province: userProvince,
        zip: userZIP,
        street: userStreet,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    //c) disable edit 
    document.getElementById('provinceInput').disabled = true;
    document.getElementById('cityInput').disabled = true;
    document.getElementById('ZIPInput').disabled = true;
    document.getElementById('StreetInput').disabled = true;
}

function logOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("Log out successfully!");
        window.location.assign("index.html");
    }).catch((error) => {
        // An error happened.
        console.log("Error adding new user: " + error);
    });
}

//call the function to run it 
populateUserInfo();