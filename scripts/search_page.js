
function search() {
    const searchQuery = document.getElementById("searchInput").value;

    // Query Firestore based on the search input
    db.collection("posts")
      .where("tag", "==", searchQuery)
      .get()
      .then((querySnapshot) => {
        const resultsContainer = document.getElementById("searchResults");
        resultsContainer.innerHTML = ""; // Clear previous results

        querySnapshot.forEach((doc) => {
          // Display each result in the results container
          const resultDiv = document.createElement("div");
          resultDiv.textContent = doc.data().title; 
          resultsContainer.appendChild(resultDiv);
        });
      })
      .catch((error) => {
        console.error("Error searching Firestore: ", error);
      });
  }