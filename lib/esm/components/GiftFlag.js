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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { get, isEmpty } from 'lodash';
import AnimatedLottieView from 'lottie-react-native';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming, } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { WIDTH_SCREEN } from '../constants/spacing';
import { GiftType } from '../enums/giftType';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, } from '../utils/scaling';
var timeout;
export var refGiftFlag = React.createRef();
var GiftFlag = function (_a) {
    var a = useSharedValue(WIDTH_SCREEN);
    var opacity = useSharedValue(1);
    var animationStyle = useAnimatedStyle(function () {
        return {
            transform: [{ translateX: a.value }],
            opacity: opacity.value,
        };
    });
    var _b = useState(), currentIcon = _b[0], setCurrentIcon = _b[1];
    useImperativeHandle(refGiftFlag, function () { return ({
        startAnimation: startAnimation,
    }); });
    var startAnimation = function (lottieIcon) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            cancelAnimation(a);
            cancelAnimation(opacity);
            clearTimeout(timeout);
            setCurrentIcon(lottieIcon);
            timeout = setTimeout(function () {
                a.value = withSpring(0);
                a.value = withDelay(5000, withSpring(-WIDTH_SCREEN));
                opacity.value = withDelay(2000, withTiming(0, { duration: 5500 }, function () {
                    opacity.value = 1;
                    a.value = WIDTH_SCREEN;
                }));
            }, 500);
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(Animated.View, { style: [styles.sendItem, animationStyle] },
        React.createElement(View, { style: styles.wrapGiftFlag },
            React.createElement(LinearGradient, { style: styles.linear, start: { x: 0, y: 0 }, end: { x: 1.4, y: 0 }, colors: [
                    colors.light.INDIGO,
                    colors.light.ASTRAL,
                    colors.light.AZURE_RADIANCE_2,
                    colors.light.TRANSPARENT,
                ] }),
            React.createElement(Text, { style: [defaultStyle.subButton, { color: colors.light.White }] }, "".concat(get(currentIcon, 'user_name', 'Thuan'), " send ")),
            !isEmpty(currentIcon) ? (currentIcon.gift_data.gift_type === GiftType.GIF ? (React.createElement(FastImage, { source: { uri: get(currentIcon, 'gift_data.resource') }, style: styles.lottieIcon, resizeMode: 'contain' })) : (React.createElement(AnimatedLottieView, { autoPlay: true, source: { uri: get(currentIcon, 'gift_data.resource') }, style: styles.lottieIcon, resizeMode: 'contain' }))) : null,
            React.createElement(Text, { style: styles.count }, "x ".concat(get(currentIcon, 'quantity', 999))))));
};
export default React.memo(GiftFlag);
var styles = StyleSheet.create({
    sendItem: {
        marginBottom: pixelSizeVertical(16),
    },
    wrapGiftFlag: __assign({ width: WIDTH_SCREEN / 1.7, height: heightPixel(36), paddingHorizontal: pixelSizeHorizontal(16), overflow: 'visible' }, defaultStyle.flexRow),
    linear: __assign(__assign({}, StyleSheet.absoluteFillObject), { borderRadius: fontPixel(20) }),
    lottieIcon: {
        width: widthPixel(48),
        height: widthPixel(48),
    },
    count: __assign(__assign({}, defaultStyle.button1), { color: colors.light.SUPPER_NOVA }),
});
