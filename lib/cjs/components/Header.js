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
var icons_1 = require("../assets/icons");
var IconButton_1 = require("./IconButton");
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var scaling_1 = require("../utils/scaling");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_agora_1 = require("react-native-agora");
var Header = function (_a) {
    var onPress = _a.onPress, _b = _a.concurrent, concurrent = _b === void 0 ? 0 : _b, connection = _a.connection, peerIds = _a.peerIds;
    var top = (0, react_native_safe_area_context_1.useSafeAreaInsets)().top;
    return (react_1.default.createElement(react_native_1.View, { style: [styles.contain, { top: top + (0, scaling_1.heightPixel)(16) }] },
        connection === react_native_agora_1.ConnectionStateType.Connected && Boolean(peerIds.length) && (react_1.default.createElement(react_native_1.View, { style: styles.wrapConcurrent },
            react_1.default.createElement(react_native_1.Text, { style: [defaultStyle_1.defaultStyle.subButton, { color: colors_1.colors.WHITE }] }, concurrent))),
        react_1.default.createElement(IconButton_1.IconButton, { icon: icons_1.ic_close, onPress: onPress, tintColor: colors_1.colors.light.White })));
};
exports.default = react_1.default.memo(Header);
var styles = react_native_1.StyleSheet.create({
    contain: __assign({ position: 'absolute', zIndex: 999, alignSelf: 'flex-end', paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(16) }, defaultStyle_1.defaultStyle.flexRow),
    wrapConcurrent: {
        backgroundColor: colors_1.colors.light.DUSTY_GRAY,
        padding: (0, scaling_1.fontPixel)(4),
        borderRadius: (0, scaling_1.fontPixel)(10),
        marginHorizontal: (0, scaling_1.pixelSizeHorizontal)(8),
        minWidth: (0, scaling_1.widthPixel)(30),
        alignItems: 'center',
    },
});
