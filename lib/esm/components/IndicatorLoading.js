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
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
export var IndicatorLoading = function (_a) {
    var _b = _a.backgroundColor, backgroundColor = _b === void 0 ? colors.light.White : _b;
    return (React.createElement(View, { style: [styles.container, { backgroundColor: backgroundColor }] },
        React.createElement(ActivityIndicator, null)));
};
var styles = StyleSheet.create({
    container: __assign(__assign({}, defaultStyle.container), { justifyContent: 'center', alignItems: 'center' }),
});
