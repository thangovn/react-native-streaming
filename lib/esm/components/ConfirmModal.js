var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Pressable from '../components/Pressable';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, heightPixel, widthPixel } from '../utils/scaling';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
export var refConfirmModal = React.createRef();
var ConfirmModal = function () {
    var _a = useState(false), visible = _a[0], setVisible = _a[1];
    useImperativeHandle(refConfirmModal, function () { return ({
        open: function () { return setVisible(true); },
        close: function () { return setVisible(false); },
    }); });
    return (React.createElement(ReactNativeModal, { isVisible: visible, useNativeDriver: true, hideModalContentWhileAnimating: true },
        React.createElement(View, { style: styles.body },
            React.createElement(Text, { style: styles.content }, 'Your current balance is not enough and need to top up at least 9999 diamonds to complete the purchase'),
            React.createElement(View, { style: defaultStyle.flexRow },
                React.createElement(Button, { name: 'Cancel', isOutLine: true, onPress: function () { return setVisible(false); } }),
                React.createElement(View, { style: { width: widthPixel(8) } }),
                React.createElement(Button, { name: 'Top-up', onPress: function () { return setVisible(false); } })))));
};
export default React.memo(ConfirmModal);
var styles = StyleSheet.create({
    btn: {
        borderRadius: fontPixel(10),
        borderWidth: 0.5,
        borderColor: colors.light.JAFFA,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPixel(42),
        backgroundColor: colors.light.JAFFA,
    },
    outline: {
        borderWidth: 0.5,
        borderColor: colors.light.INDIGO,
        borderRadius: fontPixel(8),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPixel(42),
    },
    body: {
        backgroundColor: colors.light.White,
        padding: fontPixel(16),
        borderRadius: fontPixel(16),
    },
    content: __assign(__assign({}, defaultStyle.subButton), { color: colors.light.SHARK, marginBottom: heightPixel(16) }),
});
var Button = function (_a) {
    var name = _a.name, onPress = _a.onPress, _b = _a.isOutLine, isOutLine = _b === void 0 ? false : _b;
    return (React.createElement(Pressable, { onPress: onPress, style: isOutLine ? styles.outline : styles.btn },
        React.createElement(Text, { style: [
                defaultStyle.body,
                { color: isOutLine ? colors.light.INDIGO : colors.light.White },
            ] }, name)));
};
