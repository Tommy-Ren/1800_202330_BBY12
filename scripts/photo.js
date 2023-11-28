const snap = document.getElementById('snap');
const fileInput = document.getElementById("pic-input"); 
let videoStream;

// Initialize camera access
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    videoStream = stream;
  })
  .catch((err) => {
    console.error(`Error accessing the camera: ${err}`);
  });

// Function to capture image from video stream
function captureImage() {
  const video = document.createElement('video');
  video.srcObject = videoStream;
  video.play();

  // Create a canvas to capture the image
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the video frame to the canvas
  canvas.getContext('2d').drawImage(video, 0, 0);

  // Stop video playback
  video.pause();
  videoStream.getTracks().forEach(track => track.stop());

  return canvas;
}

snap.addEventListener('click', () => {
  const canvas = captureImage();

  // Convert canvas to blob
  canvas.toBlob(function (blob) {
    // Save the Blob in localStorage
    localStorage.setItem('capturedImage', blob);
    // Redirect to the upload page
    window.location.href = './upload_photo.html';
  }, 'image/jpeg');
});