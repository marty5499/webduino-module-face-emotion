var emotion_labels = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];

// create model
async function loadEmotionModel(path) {
  emotionModel = await tf.loadModel(path);
  return emotionModel;
}

function preprocessEmotion(imgData) {
  return tf.tidy(() => {
    let tensor = tf.fromPixels(imgData).toFloat();
    tensor = tensor.resizeBilinear([100, 100])
    tensor = tf.cast(tensor, 'float32')
    const offset = tf.scalar(255.0);
    // Normalize the image 
    const normalized = tensor.div(offset);
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched
  })
}

function getEmotion(canvas, box) {
  var ctx = canvas.getContext('2d');
  let cT = ctx.getImageData(box.x, box.y, box.width, box.height);
  cT = preprocessEmotion(cT);
  z = emotionModel.predict(cT);
  let index = z.argMax(1).dataSync()[0];
  let label = emotion_labels[index];
  return label;
}