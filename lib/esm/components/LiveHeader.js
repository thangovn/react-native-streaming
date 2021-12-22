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
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { WIDTH_SCREEN } from '../constants/spacing';
import { getTime } from '../utils/getTime';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, } from '../utils/scaling';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
var time;
export var LiveHeader = function (_a) {
    var onPressCamera = _a.onPressCamera, onPressEndLive = _a.onPressEndLive, _b = _a.concurrent, concurrent = _b === void 0 ? 0 : _b, joinSucceed = _a.joinSucceed;
    var inset = useSafeAreaInsets();
    var _c = useState(0), voiceTime = _c[0], setVoiceTime = _c[1];
    useEffect(function () {
        if (joinSucceed) {
            setVoiceTime(0);
            time = setInterval(function () {
                setVoiceTime(function (currentVoice) { return currentVoice + 1; });
            }, 1000);
        }
        return function () { return clearInterval(time); };
    }, [joinSucceed]);
    return (React.createElement(View, { style: [styles.container, { top: inset.top + heightPixel(10) }] },
        React.createElement(View, { style: defaultStyle.flexRow },
            React.createElement(Pressable, null,
                React.createElement(FastImage, { source: {
                        uri: 'https://cdn.pixabay.com/photo/2021/12/01/18/17/cat-6838844_960_720.jpg',
                    }, style: defaultStyle.icon_36 })),
            React.createElement(View, { style: styles.wrapConcurrent },
                React.createElement(Icon, { name: 'people-outline', size: widthPixel(14), color: colors.WHITE }),
                React.createElement(Text, { style: [
                        defaultStyle.subButton,
                        { color: colors.WHITE, marginHorizontal: pixelSizeHorizontal(4) },
                    ] }, concurrent))),
        React.createElement(View, { style: defaultStyle.flexRow },
            React.createElement(Icon, { name: 'camera-reverse-outline', size: widthPixel(28), color: colors.WHITE, onPress: onPressCamera }),
            React.createElement(View, { style: { width: widthPixel(16) } }),
            React.createElement(Text, { style: [
                    defaultStyle.subButton,
                    { color: colors.WHITE, minWidth: widthPixel(40) },
                ] }, getTime(voiceTime, true)),
            React.createElement(View, { style: { width: widthPixel(16) } }),
            React.createElement(Icon, { name: 'power-outline', size: widthPixel(28), color: colors.WHITE, onPress: onPressEndLive }))));
};
var styles = StyleSheet.create({
    container: __assign(__assign({}, defaultStyle.spaceBetween), { marginVertical: pixelSizeVertical(10), paddingHorizontal: pixelSizeHorizontal(16), position: 'absolute', width: WIDTH_SCREEN, zIndex: 9999 }),
    wrapConcurrent: __assign(__assign({}, defaultStyle.flexRow), { backgroundColor: colors.BLACK_30, paddingHorizontal: fontPixel(8), paddingVertical: fontPixel(4), borderRadius: fontPixel(16), marginHorizontal: fontPixel(8) }),
});
