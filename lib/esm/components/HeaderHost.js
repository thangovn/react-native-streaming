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
import { IconButton } from './IconButton';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { spacing } from '../constants/spacing';
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/scaling';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
var HeaderHost = function (_a) {
    var centerName = _a.centerName, leftComponent = _a.leftComponent, rightComponent = _a.rightComponent, onPressSearch = _a.onPressSearch, _b = _a.edges, edges = _b === void 0 ? 'top' : _b, centerTextStyle = _a.centerTextStyle, itemStyle = _a.itemStyle, containerStyle = _a.containerStyle, centerStyle = _a.centerStyle, leftViewStyle = _a.leftViewStyle, tintColorLeftIcon = _a.tintColorLeftIcon, onBack = _a.onBack;
    return (React.createElement(SafeAreaView, { edges: [edges], style: [styles.contain, containerStyle] },
        React.createElement(View, { style: [styles.leftView, leftViewStyle] }, Boolean(leftComponent) ? (leftComponent()) : (React.createElement(IconButton, { iconVector: 'chevron-back-outline', onPress: onBack, tintColor: tintColorLeftIcon }))),
        centerName && (React.createElement(View, { style: [styles.center, centerStyle] },
            React.createElement(Text, { style: [styles.centerName, centerTextStyle] }, centerName))),
        React.createElement(View, { style: { flex: 1, alignItems: 'flex-end' } }, typeof rightComponent === 'function' ? (rightComponent()) : Array.isArray(rightComponent) ? (React.createElement(View, { style: defaultStyle.flexRow }, rightComponent.map(function (item, i) { return (React.createElement(Item, { key: i, onPress: item.onPress, icon: item.icon, tintColor: item.tintColor, containerStyle: [styles.containerStyle, itemStyle] })); }))) : (React.createElement(Item, { onPress: onPressSearch, icon: 'search-outline' })))));
};
export default React.memo(HeaderHost);
var styles = StyleSheet.create({
    leftView: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerName: __assign(__assign({}, defaultStyle.heading2), { textAlign: 'center' }),
    contain: __assign(__assign({}, defaultStyle.flexRow), { justifyContent: 'space-between', paddingHorizontal: pixelSizeHorizontal(spacing.sixteen), paddingVertical: pixelSizeVertical(spacing.ten) }),
    center: {
        flex: 1,
        marginHorizontal: pixelSizeHorizontal(8),
        alignItems: 'center',
    },
    containerStyle: {
        marginLeft: widthPixel(spacing.twenty),
    },
});
export var Item = function (_a) {
    var onPress = _a.onPress, icon = _a.icon, _b = _a.tintColor, tintColor = _b === void 0 ? colors.WHITE : _b, containerStyle = _a.containerStyle;
    return (React.createElement(Icon, { name: icon, size: widthPixel(28), color: tintColor, onPress: onPress, style: { marginLeft: widthPixel(8) } }));
};
