"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultStyle_1 = require("../constants/defaultStyle");
var scaling_1 = require("../utils/scaling");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var colors_1 = require("../constants/colors");
var ButtonHost = function (_a) {
    var name = _a.name, onPress = _a.onPress, _b = _a.disabled, disabled = _b === void 0 ? false : _b;
    return (react_1.default.createElement(react_native_1.Pressable, { onPress: onPress, style: styles.btn, disabled: disabled },
        react_1.default.createElement(react_native_1.Text, { style: [defaultStyle_1.defaultStyle.body, { color: colors_1.colors.WHITE }] }, name)));
};
exports.default = react_1.default.memo(ButtonHost);
var styles = react_native_1.StyleSheet.create({
    btn: {
        backgroundColor: colors_1.colors.light.INDIGO,
        alignSelf: 'center',
        paddingVertical: (0, scaling_1.pixelSizeVertical)(8),
        width: (0, scaling_1.widthPixel)(150),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (0, scaling_1.fontPixel)(8),
        marginBottom: (0, scaling_1.heightPixel)(32),
    },
});
