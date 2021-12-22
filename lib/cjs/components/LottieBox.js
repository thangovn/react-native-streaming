"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useKeyboard_1 = require("../hooks/useKeyboard");
var scaling_1 = require("../utils/scaling");
var lottie_react_native_1 = __importDefault(require("lottie-react-native"));
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var GiftListModal_1 = require("./GiftListModal");
var lotties_1 = require("../assets/lotties");
var LottieBox = function (_a) {
    var _b = _a.source, source = _b === void 0 ? lotties_1.lottie_gift_box : _b;
    var isShowKeyboard = (0, useKeyboard_1.useKeyboard)().isShowKeyboard;
    var handlePress = function () {
        react_native_1.Keyboard.dismiss();
        setTimeout(function () {
            var _a;
            (_a = GiftListModal_1.refGiftModal.current) === null || _a === void 0 ? void 0 : _a.open();
        }, isShowKeyboard ? 500 : 0);
    };
    return (react_1.default.createElement(react_native_1.Pressable, { onPress: handlePress, style: styles.lottie },
        react_1.default.createElement(lottie_react_native_1.default, { source: source, autoPlay: true, loop: true, style: styles.lottie })));
};
exports.default = react_1.default.memo(LottieBox);
var styles = react_native_1.StyleSheet.create({
    lottie: {
        width: (0, scaling_1.widthPixel)(40),
        height: (0, scaling_1.widthPixel)(40),
    },
});
