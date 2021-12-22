"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorLoading = void 0;
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var IndicatorLoading = function (_a) {
    var _b = _a.backgroundColor, backgroundColor = _b === void 0 ? colors_1.colors.light.White : _b;
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor: backgroundColor }] },
        react_1.default.createElement(react_native_1.ActivityIndicator, null)));
};
exports.IndicatorLoading = IndicatorLoading;
var styles = react_native_1.StyleSheet.create({
    container: __assign(__assign({}, defaultStyle_1.defaultStyle.container), { justifyContent: 'center', alignItems: 'center' }),
});
