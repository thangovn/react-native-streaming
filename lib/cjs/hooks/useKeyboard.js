"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboard = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var useKeyboard = function () {
    var _a = (0, react_1.useState)(0), keyboardHeight = _a[0], setKeyboardHeight = _a[1];
    var _b = (0, react_1.useState)(false), isShowKeyboard = _b[0], setIsShowKeyboard = _b[1];
    var onKeyboardDidShow = (0, react_1.useCallback)(function (e) {
        setKeyboardHeight(e.endCoordinates.height);
        setIsShowKeyboard(true);
    }, [keyboardHeight, isShowKeyboard]);
    var onKeyboardDidHide = (0, react_1.useCallback)(function () {
        setKeyboardHeight(0);
        setIsShowKeyboard(false);
    }, [keyboardHeight, isShowKeyboard]);
    (0, react_1.useEffect)(function () {
        var showSubscription = react_native_1.Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
        var hideSubscription = react_native_1.Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
        return function () {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return { keyboardHeight: keyboardHeight, isShowKeyboard: isShowKeyboard };
};
exports.useKeyboard = useKeyboard;
