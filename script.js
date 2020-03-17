async function app() {
  document.getElementById('console').innerText = "Loading AI module..."

  // Configure data input from user.
  // webcamData will become an object from TensorFlow.js data API
  // which can capture images from the web camera as Tensors.
  let webcamData;
  let webcamElement = document.getElementById('webcam');

  //---- Loading and execution ----//
  // Create our own untrained classifier.
  const classifier = knnClassifier.create();
  // Load the MobileNet model.
  let net = await mobilenet.load();
  document.getElementById('console').innerText = "Add a class to make predictions!"
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
      document.getElementById('enable-webcam').hidden = false;
  document.getElementById('upload-btn').hidden = false;
  let buttonsDisabled = true;
  let cameraEnabled = false;
  let classCounts = {
    0: 0,
    1: 0,
    2: 0
  };
  const classes = ['A', 'B', 'C'];


  //---- Helper functions. ----//
  const enableWebcam = async () => {
    document.getElementById('enable-webcam').hidden = true;
    document.getElementById('disable-webcam').hidden = false;
    webcamElement.hidden = false;
    webcamData = await tf.data.webcam(webcamElement, {
      facingMode: 'environment'
    });
    document.getElementById('capture-img').hidden = false;
    document.getElementById('retake-img').hidden = false;
    cameraEnabled = true;
  }

  const disableWebcam = async () => {
    document.getElementById('enable-webcam').hidden = false;
    document.getElementById('disable-webcam').hidden = true;
    webcamElement.hidden = true;
    webcamData.stop();
    document.getElementById('capture-img').hidden = true;
    document.getElementById('retake-img').hidden = true;
    cameraEnabled = false;
  }

  const toggleButtons = async () => {
    buttonsDisabled = !buttonsDisabled;
    document.getElementById('class-a').disabled = buttonsDisabled;
    document.getElementById('class-b').disabled = buttonsDisabled;
    document.getElementById('class-c').disabled = buttonsDisabled;
    document.getElementById('predict-button').disabled = buttonsDisabled;
  }

  const captureImg = async () => {
    img = await webcamData.capture();
    webcamElement.pause();
    if (buttonsDisabled) toggleButtons();
  }

  // Reads an image from the webcam and associates it with a specific class index.
  const addExample = async classId => {

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that to the classifier.
    const activation = net.infer(img, 'conv_preds');

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId)
      ++classCounts[classId];

    // Increment the appropriate class count.
    document.getElementById(`class-${classId}-count`).innerText = `${classCounts[classId]}`;

    // Dispose of the tensor to release memory.
    img.dispose();
    // Renable image capture.
    webcamElement.play();
    if (!buttonsDisabled) toggleButtons();
  }

  const predictClass = async () => {
    if (classifier.getNumClasses() > 0) {
      // Get the activation from MobileNet from the webcam.
      const activation = net.infer(img, 'conv_preds');

      // Present the most likely class and confidence from the classifier module.
      const result = await classifier.predictClass(activation);
      document.getElementById('console').innerText = `
       Prediction: ${classes[result.label]}\n
       Probability: ${result.confidences[result.label]}\n
     `;
    } else
      document.getElementById('console').innerText = document.getElementById('console2').innerText = "No classes added yet!";

    // Give some breathing room by waiting for the next animation frame to fire.
    await tf.nextFrame();
    // Scroll to result presented at top, and enable buttons to capture another image.
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (!buttonsDisabled) toggleButtons();
  }

  //---- Configure user interaction. ----//
  // Enable webcam when user clicks 'Enable Camera' button.
  document.getElementById('enable-webcam').addEventListener('click', () => {
    enableWebcam();
    document.getElementById('upload-div').hidden = true;
    document.getElementById('image-preview').hidden = true;
    document.getElementById('upload-btn').hidden = false;
  });
  document.getElementById('disable-webcam').addEventListener('click', () => {
    document.getElementById('upload-btn').hidden = false;
    disableWebcam();
  });
  // Capture images with button click.
  document.getElementById('capture-img').addEventListener('click', () => {
    captureImg();
    if (buttonsDisabled) toggleButtons();
  });
  document.getElementById('retake-img').addEventListener('click', () => {
    // Dispose of the tensor to release memory.
    img.dispose();
    webcamElement.play();
    if (!buttonsDisabled) toggleButtons();
  });

  // File upload.
  document.getElementById('upload-btn').addEventListener('click', function() {
    if (cameraEnabled) disableWebcam();
    this.hidden = true;
    document.getElementById('upload-div').hidden = false;
  });
  document.getElementById('upload-input').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      var file = this.files[0]; // reference first file BLOB
      document.getElementById('file-preview').innerText = this.files[0].name;

      url = URL.createObjectURL(file); // create an Object URL
      let preview = document.getElementById('image-preview')
      preview.src = url; // create a temp. image
      preview.hidden = false;
      if (buttonsDisabled) toggleButtons();

      preview.onload = function() { // handle async image loading
        img = tf.browser.fromPixels(preview);
        img.print();
        URL.revokeObjectURL(this.src); // free memory held by Object URL
      }
    }
  });


  // When clicking a button, add an example for that class.
  document.getElementById('class-a').addEventListener('click', () => addExample(0));
  document.getElementById('class-b').addEventListener('click', () => addExample(1));
  document.getElementById('class-c').addEventListener('click', () => addExample(2));

  document.getElementById('predict-button').addEventListener('click', () => predictClass());
}

app();
