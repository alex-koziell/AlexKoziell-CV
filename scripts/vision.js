/*
Mobile and Tablet Check
*/
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}

/*
document elements
*/
const mainPrediction  = document.getElementById("main-prediction")
const predictionTexts = document.getElementsByClassName("pred-text")
const predictionConfs = document.getElementsByClassName("pred-conf")
const img = document.getElementById("pred-img")
const fileInput = document.getElementById('pred-upload')

/*
listen for file upload
*/
fileInput.addEventListener('change', function() {
  mainPrediction.innerHTML = 'Predicting...';
  if (this.files && this.files[0]) {
    var file = this.files[0]; // reference first file BLOB
    document.getElementById('file-preview').innerText = this.files[0].name;

    url = URL.createObjectURL(file); // create an Object URL
    img.src = url; // create a temp. image

    makePrediction();
  }
});

/*
model and predictions
*/
function makePrediction() {
  // Load the model.
  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(img).then(predictions => {
      console.log('Predictions: ');
      predictions.map((prediction, index) => {
        if (!index) { mainPrediction.innerHTML = prediction.className; }
        predictionTexts[index].innerHTML = prediction.className;
        predictionConfs[index].innerHTML = prediction.probability;
      })
      console.log(predictions);
    });
  });
}

makePrediction();
