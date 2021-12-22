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
exports.Item = void 0;
var IconButton_1 = require("./IconButton");
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var spacing_1 = require("../constants/spacing");
var scaling_1 = require("../utils/scaling");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Ionicons_1 = __importDefault(require("react-native-vector-icons/Ionicons"));
var HeaderHost = function (_a) {
    var centerName = _a.centerName, leftComponent = _a.leftComponent, rightComponent = _a.rightComponent, onPressSearch = _a.onPressSearch, _b = _a.edges, edges = _b === void 0 ? 'top' : _b, centerTextStyle = _a.centerTextStyle, itemStyle = _a.itemStyle, containerStyle = _a.containerStyle, centerStyle = _a.centerStyle, leftViewStyle = _a.leftViewStyle, tintColorLeftIcon = _a.tintColorLeftIcon, onBack = _a.onBack;
    return (react_1.default.createElement(react_native_safe_area_context_1.SafeAreaView, { edges: [edges], style: [styles.contain, containerStyle] },
        react_1.default.createElement(react_native_1.View, { style: [styles.leftView, leftViewStyle] }, Boolean(leftComponent) ? (leftComponent()) : (react_1.default.createElement(IconButton_1.IconButton, { iconVector: 'chevron-back-outline', onPress: onBack, tintColor: tintColorLeftIcon }))),
        centerName && (react_1.default.createElement(react_native_1.View, { style: [styles.center, centerStyle] },
            react_1.default.createElement(react_native_1.Text, { style: [styles.centerName, centerTextStyle] }, centerName))),
        react_1.default.createElement(react_native_1.View, { style: { flex: 1, alignItems: 'flex-end' } }, typeof rightComponent === 'function' ? (rightComponent()) : Array.isArray(rightComponent) ? (react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.flexRow }, rightComponent.map(function (item, i) { return (react_1.default.createElement(exports.Item, { key: i, onPress: item.onPress, icon: item.icon, tintColor: item.tintColor, containerStyle: [styles.containerStyle, itemStyle] })); }))) : (react_1.default.createElement(exports.Item, { onPress: onPressSearch, icon: 'search-outline' })))));
};
exports.default = react_1.default.memo(HeaderHost);
var styles = react_native_1.StyleSheet.create({
    leftView: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerName: __assign(__assign({}, defaultStyle_1.defaultStyle.heading2), { textAlign: 'center' }),
    contain: __assign(__assign({}, defaultStyle_1.defaultStyle.flexRow), { justifyContent: 'space-between', paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(spacing_1.spacing.sixteen), paddingVertical: (0, scaling_1.pixelSizeVertical)(spacing_1.spacing.ten) }),
    center: {
        flex: 1,
        marginHorizontal: (0, scaling_1.pixelSizeHorizontal)(8),
        alignItems: 'center',
    },
    containerStyle: {
        marginLeft: (0, scaling_1.widthPixel)(spacing_1.spacing.twenty),
    },
});
var Item = function (_a) {
    var onPress = _a.onPress, icon = _a.icon, _b = _a.tintColor, tintColor = _b === void 0 ? colors_1.colors.WHITE : _b, containerStyle = _a.containerStyle;
    return (react_1.default.createElement(Ionicons_1.default, { name: icon, size: (0, scaling_1.widthPixel)(28), color: tintColor, onPress: onPress, style: { marginLeft: (0, scaling_1.widthPixel)(8) } }));
};
exports.Item = Item;
