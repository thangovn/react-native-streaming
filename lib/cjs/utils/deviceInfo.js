"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isIOS = void 0;
var react_native_1 = require("react-native");
exports.isIOS = react_native_1.Platform.OS === "ios";
exports.isAndroid = react_native_1.Platform.OS === "android";
