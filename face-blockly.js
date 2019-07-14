+(async function (window, webduino) {
  'use strict';
  var MODEL_URL = "https://127.0.0.1:8080/weights/";
  var MODEL_EMOTION_URL = 'https://127.0.0.1:8080/mobilenetv1_models/model.json';

  MODEL_URL = "https://marty5499.github.io/webduino-module-face-emotion/weights/";
  MODEL_URL = "https://marty5499.github.io/webduino-module-face-emotion/mobilenetv1_models/model.json";

  window.faceAPI = new webduino.module.face(MODEL_URL, MODEL_EMOTION_URL);

  window.createCamera = function (camSource, width, height, rotate, callback) {
    var c1 = document.createElement('canvas');
    c1.width = width;
    c1.height = height;
    document.body.appendChild(c1);
    var cam = new Camera(camSource);
    if (rotate) {
      cam.setRotate(90);
    }
    cam.onCanvas(c1, function (c, img) {
      callback(c);
    });
    return cam;
  }

}(window, window.webduino));