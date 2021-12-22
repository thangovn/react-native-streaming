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
import { lottie_confetti } from '../assets/lotties';
import { GiftType } from '../enums/giftType';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { useKeyboard } from '../hooks/useKeyboard';
import { isIOS } from '../utils/deviceInfo';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, } from '../utils/scaling';
import { get, isEmpty } from 'lodash';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import Composer from './Composer';
import GiftFlag from './GiftFlag';
var timeout;
export var refChatList = React.createRef();
var ChatList = function (_a) {
    var data = _a.data, onSend = _a.onSend, rightIconComposer = _a.rightIconComposer, currentUserId = _a.currentUserId;
    var renderMessageItem = function (_a) {
        var item = _a.item, index = _a.index;
        var sameUser = parseInt(get(item, 'user_id', 0)) === parseInt(currentUserId);
        return (React.createElement(View, { style: styles.messageItem },
            React.createElement(Text, { style: [
                    defaultStyle.subButton,
                    { color: sameUser ? colors.light.JAFFA : colors.light.MainColor },
                ] }, "".concat(item.user_name, ": ")),
            React.createElement(Text, { style: styles.messageText }, item.message)));
    };
    var refLottie = useRef();
    var refConfetti = useRef();
    var _b = useState(), currentIcon = _b[0], setCurrentIcon = _b[1];
    useImperativeHandle(refChatList, function () { return ({
        startAnimation: function (icon) {
            var _a, _b;
            (_a = refLottie.current) === null || _a === void 0 ? void 0 : _a.reset();
            (_b = refConfetti.current) === null || _b === void 0 ? void 0 : _b.reset();
            cancelAnimation(scale);
            cancelAnimation(right);
            cancelAnimation(bottom);
            cancelAnimation(opacity);
            cancelAnimation(opacityConfetti);
            clearTimeout(timeout);
            setCurrentIcon(icon);
            timeout = setTimeout(function () {
                var _a, _b;
                (_a = refLottie.current) === null || _a === void 0 ? void 0 : _a.play();
                (_b = refConfetti.current) === null || _b === void 0 ? void 0 : _b.play();
                opacity.value = withTiming(0, { duration: 8000 }, function () {
                    scale.value = 0;
                    opacity.value = 1;
                    bottom.value = 0;
                    right.value = 0;
                });
                opacityConfetti.value = withTiming(0, { duration: 10000 }, function () {
                    opacityConfetti.value = 1;
                });
                scale.value = withTiming(3, { duration: 1000 });
                bottom.value = withTiming(HEIGHT_SCREEN / 1.5 - heightPixel(50), { duration: 500 });
                right.value = withTiming(WIDTH_SCREEN / 2 - widthPixel(50), { duration: 500 });
            }, 600);
        },
    }); });
    var scale = useSharedValue(0);
    var bottom = useSharedValue(0);
    var right = useSharedValue(0);
    var opacity = useSharedValue(1);
    var opacityConfetti = useSharedValue(1);
    var animationStyle = useAnimatedStyle(function () {
        return {
            transform: [{ scale: scale.value }],
            bottom: bottom.value,
            right: right.value,
            opacity: opacity.value,
        };
    });
    var animationConfettiStyle = useAnimatedStyle(function () {
        return {
            opacity: opacityConfetti.value,
        };
    });
    useEffect(function () {
        RNAndroidKeyboardAdjust.setAdjustResize();
        return function () { return RNAndroidKeyboardAdjust.setAdjustPan(); };
    }, []);
    var keyboardHeight = useKeyboard().keyboardHeight;
    return (React.createElement(KeyboardAvoidingView, { behavior: isIOS ? 'padding' : null, style: [
            styles.contain,
            __assign({}, Platform.select({
                android: {
                    bottom: keyboardHeight +
                        heightPixel(keyboardHeight > 0 ? heightPixel(24) : heightPixel(32)),
                },
            })),
        ] },
        React.createElement(Animated.View, { style: [styles.box, animationStyle] }, !isEmpty(currentIcon) ? (React.createElement(React.Fragment, null, currentIcon.gift_data.gift_type === GiftType.GIF ? (React.createElement(FastImage, { source: { uri: get(currentIcon, 'gift_data.resource') }, style: StyleSheet.absoluteFill, resizeMode: 'contain' })) : (React.createElement(AnimatedLottieView, { ref: refLottie, source: get(currentIcon, 'gift_data.resource'), style: StyleSheet.absoluteFill, resizeMode: 'contain' })))) : null),
        React.createElement(Animated.View, { style: [styles.wrapConfetti, animationConfettiStyle] },
            React.createElement(AnimatedLottieView, { loop: false, resizeMode: 'cover', ref: refConfetti, source: lottie_confetti, style: styles.lottieConfetti })),
        React.createElement(View, { style: styles.inner },
            React.createElement(GiftFlag, null),
            React.createElement(FlatList, { data: data, keyExtractor: function (item, index) { return "".concat(index); }, renderItem: renderMessageItem, inverted: true, style: styles.containFlatList, showsVerticalScrollIndicator: false }),
            React.createElement(Composer, { onSend: onSend, source: rightIconComposer }))));
};
export default React.memo(ChatList);
var styles = StyleSheet.create({
    wrapConfetti: {
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        position: 'absolute',
    },
    inner: {
        padding: fontPixel(16),
        flex: 1,
        justifyContent: 'flex-end',
    },
    containFlatList: {
        maxHeight: heightPixel(300),
        zIndex: 999,
    },
    messageItem: __assign(__assign({}, defaultStyle.flexRow), { backgroundColor: colors.BLACK_30, marginVertical: pixelSizeVertical(4), borderRadius: fontPixel(20), paddingVertical: pixelSizeVertical(4), paddingHorizontal: pixelSizeHorizontal(8), alignSelf: 'flex-start' }),
    messageText: __assign(__assign({}, defaultStyle.subButton), { color: colors.light.White, alignSelf: 'flex-start', maxWidth: WIDTH_SCREEN / 1.5 }),
    contain: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    box: {
        width: widthPixel(100),
        height: widthPixel(100),
        position: 'absolute',
    },
    lottieConfetti: __assign({}, StyleSheet.absoluteFillObject),
});
