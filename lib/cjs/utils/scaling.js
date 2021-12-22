"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelSizeHorizontal = exports.pixelSizeVertical = exports.fontPixel = exports.heightPixel = exports.widthPixel = void 0;
var react_native_1 = require("react-native");
var spacing_1 = require("../constants/spacing");
var widthBaseScale = spacing_1.WIDTH_SCREEN / 375;
var heightBaseScale = spacing_1.HEIGHT_SCREEN / 812;
function normalize(size, based) {
    if (based === void 0) { based = "width"; }
    var newSize = based === "height" ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(react_native_1.PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
var widthPixel = function (size) {
    return normalize(size, "width");
};
exports.widthPixel = widthPixel;
//for height  pixel
var heightPixel = function (size) {
    return normalize(size, "height");
};
exports.heightPixel = heightPixel;
//for font  pixel
var fontPixel = function (size) {
    return heightPixel(size);
};
exports.fontPixel = fontPixel;
//for Margin and Padding vertical pixel
var pixelSizeVertical = function (size) {
    return heightPixel(size);
};
exports.pixelSizeVertical = pixelSizeVertical;
//for Margin and Padding horizontal pixel
var pixelSizeHorizontal = function (size) {
    return widthPixel(size);
};
exports.pixelSizeHorizontal = pixelSizeHorizontal;
