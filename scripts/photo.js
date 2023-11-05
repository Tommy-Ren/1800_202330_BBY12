// Get the video and snap elements
const video = document.getElementById('video');
const snap = document.getElementById('snap');

// Prompt the user to start up their webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(`Error accessing the camera: ${err}`);
  });

// Event listener for the snap button
snap.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Here you can save the image or do something with it
  // Example: canvas.toDataURL('image/png');
});