import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";
export var useKeyboard = function () {
    var _a = useState(0), keyboardHeight = _a[0], setKeyboardHeight = _a[1];
    var _b = useState(false), isShowKeyboard = _b[0], setIsShowKeyboard = _b[1];
    var onKeyboardDidShow = useCallback(function (e) {
        setKeyboardHeight(e.endCoordinates.height);
        setIsShowKeyboard(true);
    }, [keyboardHeight, isShowKeyboard]);
    var onKeyboardDidHide = useCallback(function () {
        setKeyboardHeight(0);
        setIsShowKeyboard(false);
    }, [keyboardHeight, isShowKeyboard]);
    useEffect(function () {
        var showSubscription = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
        var hideSubscription = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
        return function () {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return { keyboardHeight: keyboardHeight, isShowKeyboard: isShowKeyboard };
};
