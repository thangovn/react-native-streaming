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
import { debounce } from 'lodash';
import React, { useImperativeHandle, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Pressable from '../components/Pressable';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { GiftType } from '../enums/giftType';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, } from '../utils/scaling';
import ConfirmModal, { refConfirmModal } from './ConfirmModal';
import GiftItem from './GiftItem';
export var refGiftModal = React.createRef();
var GiftListModal = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, onDonate = _a.onDonate;
    var _c = useState(false), visible = _c[0], setVisible = _c[1];
    useImperativeHandle(refGiftModal, function () { return ({
        open: function () { return setVisible(true); },
        close: function () { return setVisible(false); },
    }); });
    var _d = useState(null), currentGift = _d[0], setCurrentGift = _d[1];
    var renderGiftItem = function (_a) {
        var item = _a.item, index = _a.index;
        return (React.createElement(GiftItem, { isGIF: item.gift_type === GiftType.GIF, giftQuantity: item.quantity_remain, icon: item.resource, name: item.name, currency: item.coin, onPress: function () { return onPressGiftItem(item); }, hasPicked: (item === null || item === void 0 ? void 0 : item.id) === (currentGift === null || currentGift === void 0 ? void 0 : currentGift.id) }));
    };
    var onPressGiftItem = function (item) {
        setCurrentGift(item);
        a.value = withTiming(0, { duration: 500 });
    };
    var onBackdrop = function () {
        setVisible(false);
        setCurrentGift(null);
    };
    var pressDonate = debounce(function () {
        var _a;
        if (!currentGift) {
            a.value = withTiming(1, { duration: 500 });
            return;
        }
        if (currentGift.quantity_remain) {
            onDonate === null || onDonate === void 0 ? void 0 : onDonate(currentGift);
            setVisible(false);
            setCurrentGift(null);
        }
        else {
            (_a = refConfirmModal.current) === null || _a === void 0 ? void 0 : _a.open();
        }
    }, 500);
    var a = useSharedValue(0);
    var aniStyle = useAnimatedStyle(function () {
        return {
            opacity: a.value,
        };
    });
    return (React.createElement(ReactNativeModal, { isVisible: visible, style: styles.modal, onBackdropPress: onBackdrop, backdropOpacity: 0, useNativeDriver: true, hideModalContentWhileAnimating: true, animationOutTiming: 500 },
        React.createElement(View, { style: styles.body },
            React.createElement(FlatList, { numColumns: 4, renderItem: renderGiftItem, keyExtractor: function (item, index) { return "".concat(index); }, data: data }),
            React.createElement(View, { style: styles.wrapWallet },
                React.createElement(View, { style: defaultStyle.flexRow },
                    React.createElement(Icon, { name: 'gem' }),
                    React.createElement(Text, { style: defaultStyle.subButton2 }, ' 1500 $')),
                React.createElement(Animated.Text, { style: [styles.alertGift, aniStyle] }, 'Please choose a gift!'),
                React.createElement(Pressable, { style: styles.wrapDonate, onPress: pressDonate },
                    React.createElement(Text, { style: styles.donateText }, 'Donate'))),
            React.createElement(ConfirmModal, null))));
};
export default React.memo(GiftListModal);
var styles = StyleSheet.create({
    donateText: __assign(__assign({}, defaultStyle.subButton), { color: colors.light.White }),
    body: {
        backgroundColor: colors.light.White,
        padding: fontPixel(16),
        borderTopLeftRadius: fontPixel(16),
        borderTopRightRadius: fontPixel(16),
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    wrapWallet: __assign(__assign({}, defaultStyle.spaceBetween), { marginVertical: heightPixel(16) }),
    wrapDonate: {
        backgroundColor: colors.light.INDIGO,
        borderRadius: fontPixel(16),
        paddingHorizontal: pixelSizeHorizontal(8),
        paddingVertical: pixelSizeVertical(4),
    },
    box: {
        zIndex: 99999,
        width: widthPixel(50),
        height: widthPixel(50),
        // backgroundColor: 'red',
        position: 'absolute',
    },
    alertGift: __assign(__assign({}, defaultStyle.subButton2), { color: colors.light.Badge }),
});
