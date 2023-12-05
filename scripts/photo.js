const snap = document.getElementById('snap');
const fileInput = document.getElementById("pic-input"); 
let videoStream;

// Initialize camera access
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    videoStream = stream;
    document.getElementById('video').srcObject = videoStream;
  })
  .catch((err) => {
    console.error(`Error accessing the camera: ${err}`);
  });

// Function to capture image from video stream
function captureImage() {
  return new Promise((resolve, reject) => {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    canvas.getContext('2d').drawImage(video, 0, 0);

    // Convert canvas to blob and resolve the promise
    canvas.toBlob(blob => {
      if (blob && blob.size > 0) {
        resolve(blob);
      } else {
        reject('Blob is empty or not created.');
      }
    }, 'image/jpeg');
  });
}

snap.addEventListener('click', () => {
  captureImage().then(blob => {
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64data = reader.result;
      localStorage.setItem('capturedImage', base64data);
      // Redirect to the upload page
      window.location.href = './upload_photo.html';
    };
    reader.readAsDataURL(blob);

    // Stop the video stream
    videoStream.getTracks().forEach(track => track.stop());
  }).catch(error => {
    console.error(error);
  });
});
