// Create an object from TensorFlow.js data API which could capture images
// from the web camera as Tensors.
let webcamData;
let webcamElement = document.getElementById('webcam');
let img;

let net;
const classifier = knnClassifier.create();
let classCounts = {0: 0, 1: 0, 2: 0};

async function app() {
  document.getElementById('console').innerText = "Loading AI module..."
  // Load the model
  net = await mobilenet.load();
  document.getElementById('console').innerText = "Add a class to make predictions!"
  document.getElementById('use-webcam').hidden = false;


  const enableWebcam = async () => {
    document.getElementById('use-webcam').hidden = true;
    webcamElement.hidden = false;
    webcamData = await tf.data.webcam(webcamElement);
    document.getElementById('capture-img').hidden = false;
    document.getElementById('retake-img').hidden = false;
  }

  const captureImg = async () => {
    img = await webcamData.capture();
    webcamElement.pause();
  }

  // Reads an image from the webcam and associates it with a specific class index.
  const addExample = async classId => {
     // Get the intermediate activation of MobileNet 'conv_preds' and pass that
     // to the classifier.
     const activation = net.infer(img, 'conv_preds');

     // Pass the intermediate activation to the classifier.
     classifier.addExample(activation, classId)
     ++classCounts[classId];
     document.getElementById(`class-${classId}-count`).innerText = `${classCounts[classId]}`;

     // Dispose of the tensor to release memory.
     img.dispose();
   }

 const predictClass = async () => {
   if (classifier.getNumClasses() > 0) {
     // Get the activation from MobileNet from the webcam.
     const activation = net.infer(img, 'conv_preds');
     // Get the most likely class and confidence from the classifier module.
     const result = await classifier.predictClass(activation);

     const classes = ['A', 'B', 'C'];
     let resultText = `
       Prediction: ${classes[result.label]}\n
       Probability: ${result.confidences[result.label]}\n
     `;
     document.getElementById('console').innerText = resultText;
     document.getElementById('console2').innerText = resultText;

     // Dispose of the tensor to release memory.
     img.dispose()
   } else {
     document.getElementById('console').innerText = document.getElementById('console2').innerText = "No classes added yet!";
   }
   // Give some breathing room by waiting for the next animation frame to fire.
   await tf.nextFrame();
 }

 // Enable webcam when user clicks button.
 document.getElementById('use-webcam').addEventListener('click', () => enableWebcam());
 // Capture images with button click.
 document.getElementById('capture-img').addEventListener('click', () => captureImg());
 document.getElementById('retake-img').addEventListener('click', () => webcamElement.play());

 // When clicking a button, add an example for that class.
 document.getElementById('class-a').addEventListener('click', () => addExample(0));
 document.getElementById('class-b').addEventListener('click', () => addExample(1));
 document.getElementById('class-c').addEventListener('click', () => addExample(2));
 document.getElementById('predict-button').addEventListener('click', () => predictClass());

}

app();
