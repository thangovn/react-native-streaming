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
import { fontPixel, pixelSizeHorizontal, widthPixel, pixelSizeVertical } from '../utils/scaling';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
var CardDashboard = function (_a) {
    var onSelectGame = _a.onSelectGame, url = _a.url, nameGame = _a.nameGame, channelLive = _a.channelLive;
    return (React.createElement(View, { style: styles.container },
        React.createElement(FastImage, { source: { uri: url }, style: styles.img }),
        React.createElement(View, { style: styles.wrapRight },
            React.createElement(TextInput, { style: styles.input, placeholder: 'Live chanel...', placeholderTextColor: colors.light.DUSTY_GRAY, value: channelLive }),
            React.createElement(View, { style: { flex: 1 } }),
            React.createElement(Pressable, { style: defaultStyle.flexRow, onPress: onSelectGame },
                React.createElement(Text, { style: styles.input }, nameGame),
                React.createElement(Icon, { name: 'chevron-forward-outline', size: widthPixel(15), color: colors.WHITE })))));
};
export default React.memo(CardDashboard);
var styles = StyleSheet.create({
    img: {
        width: widthPixel(56),
        height: widthPixel(56),
        borderRadius: fontPixel(10),
    },
    container: __assign(__assign({}, defaultStyle.flexRow), { backgroundColor: colors.BLACK_30, padding: fontPixel(8), marginHorizontal: pixelSizeHorizontal(16), marginTop: pixelSizeVertical(6), borderRadius: fontPixel(4) }),
    wrapRight: {
        marginHorizontal: fontPixel(8),
    },
    input: __assign(__assign({}, defaultStyle.button2), { color: colors.WHITE }),
});
