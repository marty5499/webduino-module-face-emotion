+(async function (window, webduino) {
  'use strict';
  var MODEL_URL = "https://127.0.0.1:8080/weights/";

  MODEL_URL = "https://marty5499.github.io/webduino-module-face-emotion/weights/";

  window.faceAPI = new webduino.module.face(MODEL_URL);

  window.createCamera = function (camSource, width, height, rotate, callback) {
    const handleWebcam = function () {
      let div = document.createElement('div');
      let c1 = document.createElement('video');
      c1.width = width;
      c1.height = height;
      div.appendChild(c1);
      div.style.cssText = 'overflow: hidden; display: inline-block; position: relative;';
      document.body.appendChild(div);
      let cam = new Webcam();
      if (rotate) {
        cam.setRotate(90);
      }
      cam.onVideo(c1, function () {
        callback(c1);
      });
      return cam;
    };

    const handleOther = function () {
      let c1 = document.createElement('canvas');
      c1.width = width;
      c1.height = height;
      document.body.appendChild(c1);
      let cam = new Camera(camSource);
      if (rotate) {
        cam.setRotate(90);
      }
      cam.onCanvas(c1, function (c, img) {
        callback(c);
      });
      return cam;
    };

    if (!camSource || camSource === "0") {
      return handleWebcam();
      // return handleOther();
    } else {
      return handleOther();
    }

  }

}(window, window.webduino));