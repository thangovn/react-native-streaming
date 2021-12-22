"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WIDTH_SCREEN = exports.HEIGHT_SCREEN = exports.spacing = void 0;
var react_native_1 = require("react-native");
exports.spacing = {
    four: 4,
    six: 6,
    eight: 8,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    sixteen: 16,
    eighteen: 18,
    twenty: 20,
    twentyFour: 24,
    twentyEight: 28,
    thirty: 30,
    thirtyFive: 30,
    forty: 40,
    image: 48,
};
exports.HEIGHT_SCREEN = react_native_1.Dimensions.get('window').height;
exports.WIDTH_SCREEN = react_native_1.Dimensions.get('window').width;
