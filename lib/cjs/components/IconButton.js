"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
var Pressable_1 = __importDefault(require("./Pressable"));
var defaultStyle_1 = require("../constants/defaultStyle");
var react_1 = __importDefault(require("react"));
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var Ionicons_1 = __importDefault(require("react-native-vector-icons/Ionicons"));
var scaling_1 = require("../utils/scaling");
var colors_1 = require("../constants/colors");
var IconButton = function (_a) {
    var icon = _a.icon, onPress = _a.onPress, style = _a.style, iconStyle = _a.iconStyle, tintColor = _a.tintColor, iconVector = _a.iconVector;
    return (react_1.default.createElement(Pressable_1.default, { onPress: onPress, style: style }, Boolean(iconVector) ? (react_1.default.createElement(Ionicons_1.default, { name: iconVector, size: (0, scaling_1.widthPixel)(28), color: colors_1.colors.WHITE, onPress: onPress, style: { marginLeft: (0, scaling_1.widthPixel)(8) } })) : (react_1.default.createElement(react_native_fast_image_1.default, { source: icon, style: [defaultStyle_1.defaultStyle.icon_24, iconStyle], tintColor: tintColor }))));
};
exports.IconButton = IconButton;
