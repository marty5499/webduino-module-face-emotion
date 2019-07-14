// face-api.js API: https://justadudewhohacks.github.io/face-api.js/docs/globals.html#euclideandistance
+(function (factory) {

  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';
  var self;
  var proto;
  var Module = scope.Module;

  function face(MODEL_URL, MODEL_EMOTION_URL) {
    console.log("MODEL_URL:", MODEL_URL, MODEL_EMOTION_URL);
    Module.call(this);
    this.MODEL_URL = MODEL_URL;
    this.MODEL_EMOTION_URL = MODEL_EMOTION_URL;
    this.process = false;
    this.lastFaceDescriptor = [];
  }

  face.prototype = proto =
    Object.create(Module.prototype, {
      constructor: {
        value: face
      }
    });

  proto.euclideanDistance = async function (face1, face2) {
    if (typeof face1 === 'string') {
      face1 = face1.split(',').length == 128 ? JSON.parse("[" + face1 + "]") : this.getDescription(face1);
    }
    if (typeof face2 === 'string') {
      face2 = face2.split(',').length == 128 ? JSON.parse("[" + face2 + "]") : this.getDescription(face2);
    }
    try {
      return faceapi.euclideanDistance(face1, face2);
    } catch (e) {
      return 1;
    }
  }

  proto.toImage = function (imgBase64) {
    var img = new Image();
    img.src = imgBase64;
    return img;
  }

  proto.getDescription = async function (image, detectEmotion) {
    if (image == null) {
      return [];
    }
    if (this.processing) {
      return this.lastFaceDescriptor;
    }
    this.processing = true;
    var tmpData = ("" + image);
    if (tmpData.split(',').length == 128) {
      return tmpData.split(',');
    }
    var imageType = tmpData.substring(0, 4);
    var isBase64 = imageType === "data";
    var isURL = imageType === "http";
    var input = isURL ? await faceapi.fetchImage(image) : image;
    if (isBase64) {
      input = this.toImage(input);
    }
    var singleFace = await faceapi.detectSingleFace(input);
    if (typeof singleFace === 'object') {
      try {
        //var dSingleFace = await faceapi.detectSingleFace(input);
        //var faceLandmarks = await faceapi.detectSingleFace(input).withFaceLandmarks();
        var descriptor = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor();
        this.processing = false;
        if (detectEmotion) {
          var e = getEmotion(image, descriptor.detection.box);
          console.log("emotion:", e);
          return e;
        }
        if (typeof descriptor.descriptor == 'undefined') {
          return [];
        }
        this.lastFaceDescriptor = descriptor.descriptor;
        return this.lastFaceDescriptor;
      } catch (e) {
        console.log("face detect Error:", e);
        this.processing = false;
        return [];
      }
    } else {
      this.processing = false;
      return [];
    }
  }

  proto.loadModel = async function () {
    console.log("load face model...");
    //await faceapi.loadTinyFaceDetectorModel(this.MODEL_URL)
    await faceapi.loadSsdMobilenetv1Model(this.MODEL_URL);
    //await faceapi.loadMtcnnModel(this.MODEL_URL);
    //await faceapi.loadTinyYolov2Model(this.MODEL_URL);
    await faceapi.loadFaceLandmarkModel(this.MODEL_URL);
    await faceapi.loadFaceRecognitionModel(this.MODEL_URL);
    await loadEmotionModel(this.MODEL_EMOTION_URL);
    console.log("done.");
  }

  scope.module.face = face;
}));