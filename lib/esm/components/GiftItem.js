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
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, } from '../utils/scaling';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
var GiftItem = function (_a) {
    var icon = _a.icon, name = _a.name, currency = _a.currency, onPress = _a.onPress, hasPicked = _a.hasPicked, giftQuantity = _a.giftQuantity, isGIF = _a.isGIF;
    var ref = useRef();
    var _b = useState(1), quantity = _b[0], setQuantity = _b[1];
    useEffect(function () {
        var interactionPromise = InteractionManager.runAfterInteractions(function () {
            return setTimeout(function () {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.play();
            }, 1000);
        });
        return function () { return interactionPromise.cancel(); };
    }, []);
    var onPressMinus = function () {
        if (quantity === 1)
            return;
        if (quantity === 99) {
            setQuantity(9);
        }
        if (quantity === 9) {
            setQuantity(1);
        }
    };
    var onPressPlus = function () {
        if (quantity === 1) {
            setQuantity(9);
        }
        if (quantity === 9) {
            setQuantity(99);
        }
    };
    var borderColor = hasPicked ? colors.light.INDIGO : colors.light.TRANSPARENT;
    return (React.createElement(Pressable, { style: [styles.item, { borderColor: borderColor }], onPress: onPress },
        isGIF ? (React.createElement(FastImage, { source: { uri: icon }, style: hasPicked ? styles.icPicked : styles.icon, resizeMode: 'contain' })) : (React.createElement(AnimatedLottieView, { ref: ref, source: icon, autoSize: true, style: hasPicked ? styles.icPicked : styles.icon })),
        Boolean(giftQuantity) && React.createElement(GiftBadge, { count: giftQuantity }),
        hasPicked ? (React.createElement(View, { style: styles.wrapPicked },
            React.createElement(Text, { style: defaultStyle.sub1 }, currency),
            React.createElement(View, { style: styles.wrapActionBtn },
                React.createElement(Pressable, { onPress: onPressMinus, hitSlop: {
                        top: widthPixel(20),
                        bottom: widthPixel(20),
                        right: widthPixel(20),
                        left: widthPixel(20),
                    } },
                    React.createElement(Icon, { name: 'minus-circle', color: quantity === 1 ? colors.light.DOVE_GRAY : colors.light.INDIGO })),
                React.createElement(Text, { style: defaultStyle.sub1 }, quantity),
                React.createElement(Pressable, { onPress: onPressPlus, hitSlop: {
                        top: widthPixel(20),
                        bottom: widthPixel(20),
                        right: widthPixel(20),
                        left: widthPixel(20),
                    } },
                    React.createElement(Icon, { name: 'plus-circle', color: quantity === 99 ? colors.light.DOVE_GRAY : colors.light.INDIGO }))))) : (React.createElement(View, { style: styles.wrapInfoItem },
            React.createElement(Text, { style: defaultStyle.subButton }, name),
            React.createElement(Text, { style: defaultStyle.sub1 }, currency)))));
};
export default React.memo(GiftItem);
var styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: fontPixel(10),
        position: 'relative',
        width: WIDTH_SCREEN / 4 - widthPixel(8),
        height: WIDTH_SCREEN / 4 - widthPixel(8),
        marginVertical: pixelSizeVertical(8),
    },
    icon: {
        width: widthPixel(48),
        height: heightPixel(48),
    },
    icPicked: {
        width: widthPixel(60),
        height: heightPixel(60),
        position: 'absolute',
        top: heightPixel(-4),
    },
    wrapInfoItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPixel(8),
    },
    wrapPicked: {
        justifyContent: 'flex-end',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: fontPixel(8),
    },
    wrapActionBtn: __assign(__assign({}, defaultStyle.spaceBetween), { width: '100%' }),
    giftBadge: {
        backgroundColor: 'red',
        position: 'absolute',
        top: heightPixel(4),
        right: widthPixel(10),
        paddingHorizontal: pixelSizeHorizontal(4),
        borderRadius: fontPixel(4),
    },
    countText: __assign(__assign({}, defaultStyle.sub1), { color: colors.light.White }),
});
var GiftBadge = function (_a) {
    var count = _a.count;
    return (React.createElement(View, { style: styles.giftBadge },
        React.createElement(Text, { style: styles.countText }, count)));
};
