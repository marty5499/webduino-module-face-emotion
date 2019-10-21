Blockly.Blocks['face_load'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("載入人臉模型檔案")
      .appendField(new Blockly.FieldDropdown([
        ["TinyFaceDetector", "1"],
        ["MtCNN", "3"],
        ["SSDMobileNetV1", "0"],
        ["TinyYolov2Model", "2"]
      ]), "model");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['face_get_description'] = {
  init: function () {
    this.appendValueInput("description")
      .setCheck("String")
      .appendField("取得臉部特徵值：");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['face_get_emotion'] = {
  init: function () {
    this.appendValueInput("emotion")
      .setCheck("String")
      .appendField("取得臉部情緒：");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['face_get_age'] = {
  init: function () {
    this.appendValueInput("age")
      .setCheck("String")
      .appendField("取得年齡：");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['face_get_gender'] = {
  init: function () {
    this.appendValueInput("gender")
      .setCheck("String")
      .appendField("取得性別：");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['face_get_euclideanDistance'] = {
  init: function () {
    this.appendValueInput("faceA")
      .setCheck(null)
      .appendField("比對臉部特徵值：");
    this.appendValueInput("faceB")
      .setCheck(null)
      .appendField("差異度 0~1 (0 為最小差異) ");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};

Blockly.Blocks['face_get_camera'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("設定")
      .appendField(new Blockly.FieldVariable("camera"), "camera")
      .appendField("並啟動，影像來源：")
      .appendField(new Blockly.FieldTextInput("0"), "src")
      .appendField("旋轉鏡頭")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "rotate");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};


Blockly.Blocks['face_get_canvas'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("從")
      .appendField(new Blockly.FieldVariable("camera"), "camera")
      .appendField("取得影像");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('https://webduino.io/');
  }
};