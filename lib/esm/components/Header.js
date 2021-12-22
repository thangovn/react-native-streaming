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
import { ic_close } from '../assets/icons';
import { IconButton } from './IconButton';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, heightPixel, pixelSizeHorizontal, widthPixel } from '../utils/scaling';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConnectionStateType } from 'react-native-agora';
var Header = function (_a) {
    var onPress = _a.onPress, _b = _a.concurrent, concurrent = _b === void 0 ? 0 : _b, connection = _a.connection, peerIds = _a.peerIds;
    var top = useSafeAreaInsets().top;
    return (React.createElement(View, { style: [styles.contain, { top: top + heightPixel(16) }] },
        connection === ConnectionStateType.Connected && Boolean(peerIds.length) && (React.createElement(View, { style: styles.wrapConcurrent },
            React.createElement(Text, { style: [defaultStyle.subButton, { color: colors.WHITE }] }, concurrent))),
        React.createElement(IconButton, { icon: ic_close, onPress: onPress, tintColor: colors.light.White })));
};
export default React.memo(Header);
var styles = StyleSheet.create({
    contain: __assign({ position: 'absolute', zIndex: 999, alignSelf: 'flex-end', paddingHorizontal: pixelSizeHorizontal(16) }, defaultStyle.flexRow),
    wrapConcurrent: {
        backgroundColor: colors.light.DUSTY_GRAY,
        padding: fontPixel(4),
        borderRadius: fontPixel(10),
        marginHorizontal: pixelSizeHorizontal(8),
        minWidth: widthPixel(30),
        alignItems: 'center',
    },
});
