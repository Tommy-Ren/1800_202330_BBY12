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
                            var userPassword = userDoc.data().password;
                            var userCity = userDoc.data().city;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
                            if (userEmail != null) {
                                document.getElementById("emailInput").value = userEmail;
                            }
                            if (userPassword != null) {
                                document.getElementById("passwordInput").value = userPassword;
                            }
                            if (userCity != null) {
                                document.getElementById("cityInput").value = userCity;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
        });
}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userEmail = document.getElementById('emailInput').value;     //get the value of the field with id="emailInput"
    userPassword = document.getElementById('passwordInput').value;       //get the value of the field with id="passwordInput"
    userCity = document.getElementById('cityInput').value;     //get the value of the field with id="emailInput"

    //b) update user's document in Firestore
    auth.updateEmail(userEmail);
    auth.updatePassword(userPassword);
    currentUser.update({
        name: userName,
        email: userEmail,
        password: userPassword,
        city: userCity
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}

//call the function to run it 
populateUserInfo();