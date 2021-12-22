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
import React, { useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/scaling';
import LottieBox from './LottieBox';
export var refComposer = React.createRef();
var Composer = function (_a) {
    var onSend = _a.onSend, source = _a.source;
    var _b = useForm(), control = _b.control, handleSubmit = _b.handleSubmit, reset = _b.reset, errors = _b.formState.errors;
    useImperativeHandle(refComposer, function () { return ({
        reset: reset,
    }); });
    return (React.createElement(View, { style: styles.contain },
        React.createElement(Controller, { control: control, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, value = _b.value;
                return (React.createElement(View, { style: styles.wrapInput },
                    React.createElement(TextInput, { autoCorrect: false, placeholder: 'Say hello~~', style: styles.input, onChangeText: onChange, value: value, multiline: true, placeholderTextColor: colors.light.Black }),
                    React.createElement(Pressable, { hitSlop: {
                            top: widthPixel(20),
                            bottom: widthPixel(20),
                            right: widthPixel(20),
                            left: widthPixel(20),
                        }, onPress: handleSubmit(onSend), style: { zIndex: 999 } },
                        React.createElement(Icon, { name: "send-outline", size: widthPixel(20), color: colors.light.Black }))));
            }, name: "text", defaultValue: "" }),
        Boolean(source) && React.createElement(LottieBox, { source: source })));
};
export default React.memo(Composer);
var styles = StyleSheet.create({
    wrapInput: __assign(__assign({}, defaultStyle.spaceBetween), { backgroundColor: colors.light.Zircon_2, borderRadius: fontPixel(16), flex: 0.9, paddingVertical: pixelSizeVertical(4), paddingHorizontal: pixelSizeHorizontal(8) }),
    input: __assign(__assign({ flex: 1, color: colors.light.SHARK }, Platform.select({
        android: {
            padding: 0,
        },
    })), { maxHeight: 100 }),
    contain: __assign(__assign({}, defaultStyle.flexRow), { justifyContent: 'space-between' }),
});
