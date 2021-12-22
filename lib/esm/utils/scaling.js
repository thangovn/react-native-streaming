import { PixelRatio } from "react-native";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../constants/spacing";
var widthBaseScale = WIDTH_SCREEN / 375;
var heightBaseScale = HEIGHT_SCREEN / 812;
function normalize(size, based) {
    if (based === void 0) { based = "width"; }
    var newSize = based === "height" ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
var widthPixel = function (size) {
    return normalize(size, "width");
};
//for height  pixel
var heightPixel = function (size) {
    return normalize(size, "height");
};
//for font  pixel
var fontPixel = function (size) {
    return heightPixel(size);
};
//for Margin and Padding vertical pixel
var pixelSizeVertical = function (size) {
    return heightPixel(size);
};
//for Margin and Padding horizontal pixel
var pixelSizeHorizontal = function (size) {
    return widthPixel(size);
};
export { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal, };
