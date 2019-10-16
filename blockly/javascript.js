Blockly.JavaScript['face_load'] = function (block) {
  // TinyYolov2Model 官方已逐漸不使用，已不在源碼中提供 weights 資料，而改用 tiny_face_detector 取代。
  // tiny_face_detector 是基於 TinyYolov2Model 上，優化改進而來的 model。
  var dropdown_model = block.getFieldValue('model');
  var MODEL_TYPE = {
    "0": 'ssd_mobilenetv1',
    "1": 'tiny_face_detector',
    "2": '', // TinyYolov2Model，相容舊的寫法。空值，使用預設的 model (ssd_mobilenetv1)
    "3": 'mtcnn'
  };
  var code;
  if (MODEL_TYPE[dropdown_model]) {
    code = `await faceAPI.loadModel("${MODEL_TYPE[dropdown_model]}");\n`;
  } else {
    code = `await faceAPI.loadModel();\n`; // 相容舊的寫法。空值，使用預設的 model (ssd_mobilenetv1)
  }
  return code;
};

Blockly.JavaScript['face_get_description'] = function (block) {
  var face_URL = Blockly.JavaScript.valueToCode(block, 'description', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "await faceAPI.getDescription(" + face_URL + ")"
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['face_get_emotion'] = function (block) {
  var face_URL = Blockly.JavaScript.valueToCode(block, 'emotion', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "await faceAPI.getEmotion(" + face_URL + ")"
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['face_get_age'] = function (block) {
  var face_URL = Blockly.JavaScript.valueToCode(block, 'age', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "(await faceAPI.getAgeAndGender(" + face_URL + ")).age"
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['face_get_gender'] = function (block) {
  var face_URL = Blockly.JavaScript.valueToCode(block, 'gender', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "(await faceAPI.getAgeAndGender(" + face_URL + ")).gender"
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['face_get_euclideanDistance'] = function (block) {
  var face1 = Blockly.JavaScript.valueToCode(block, 'faceA', Blockly.JavaScript.ORDER_ATOMIC);
  var face2 = Blockly.JavaScript.valueToCode(block, 'faceB', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "await faceAPI.euclideanDistance(" + face1 + "," + face2 + ")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#g73ris
Blockly.JavaScript['face_get_camera'] = function (block) {
  var variable_camera = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('camera'), Blockly.Variables.NAME_TYPE);
  var checkbox_rotate = block.getFieldValue('rotate') == 'TRUE';
  var text_src = block.getFieldValue('src');
  var code = variable_camera + ' = createCamera("' + text_src + '",300,225,' + checkbox_rotate + ', function(img){\n';
  code += '  ' + variable_camera + ".blobData = img;\n";
  code += '});\n';
  return code;
};


Blockly.JavaScript['face_get_canvas'] = function (block) {
  var variable_canvas = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('camera'), Blockly.Variables.NAME_TYPE);
  var code = variable_canvas + '.blobData';
  return [code, Blockly.JavaScript.ORDER_NONE];
};