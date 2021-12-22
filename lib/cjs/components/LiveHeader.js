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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveHeader = void 0;
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var spacing_1 = require("../constants/spacing");
var getTime_1 = require("../utils/getTime");
var scaling_1 = require("../utils/scaling");
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Ionicons_1 = __importDefault(require("react-native-vector-icons/Ionicons"));
var time;
var LiveHeader = function (_a) {
    var onPressCamera = _a.onPressCamera, onPressEndLive = _a.onPressEndLive, _b = _a.concurrent, concurrent = _b === void 0 ? 0 : _b, joinSucceed = _a.joinSucceed;
    var inset = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var _c = (0, react_1.useState)(0), voiceTime = _c[0], setVoiceTime = _c[1];
    (0, react_1.useEffect)(function () {
        if (joinSucceed) {
            setVoiceTime(0);
            time = setInterval(function () {
                setVoiceTime(function (currentVoice) { return currentVoice + 1; });
            }, 1000);
        }
        return function () { return clearInterval(time); };
    }, [joinSucceed]);
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { top: inset.top + (0, scaling_1.heightPixel)(10) }] },
        react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.flexRow },
            react_1.default.createElement(react_native_1.Pressable, null,
                react_1.default.createElement(react_native_fast_image_1.default, { source: {
                        uri: 'https://cdn.pixabay.com/photo/2021/12/01/18/17/cat-6838844_960_720.jpg',
                    }, style: defaultStyle_1.defaultStyle.icon_36 })),
            react_1.default.createElement(react_native_1.View, { style: styles.wrapConcurrent },
                react_1.default.createElement(Ionicons_1.default, { name: 'people-outline', size: (0, scaling_1.widthPixel)(14), color: colors_1.colors.WHITE }),
                react_1.default.createElement(react_native_1.Text, { style: [
                        defaultStyle_1.defaultStyle.subButton,
                        { color: colors_1.colors.WHITE, marginHorizontal: (0, scaling_1.pixelSizeHorizontal)(4) },
                    ] }, concurrent))),
        react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.flexRow },
            react_1.default.createElement(Ionicons_1.default, { name: 'camera-reverse-outline', size: (0, scaling_1.widthPixel)(28), color: colors_1.colors.WHITE, onPress: onPressCamera }),
            react_1.default.createElement(react_native_1.View, { style: { width: (0, scaling_1.widthPixel)(16) } }),
            react_1.default.createElement(react_native_1.Text, { style: [
                    defaultStyle_1.defaultStyle.subButton,
                    { color: colors_1.colors.WHITE, minWidth: (0, scaling_1.widthPixel)(40) },
                ] }, (0, getTime_1.getTime)(voiceTime, true)),
            react_1.default.createElement(react_native_1.View, { style: { width: (0, scaling_1.widthPixel)(16) } }),
            react_1.default.createElement(Ionicons_1.default, { name: 'power-outline', size: (0, scaling_1.widthPixel)(28), color: colors_1.colors.WHITE, onPress: onPressEndLive }))));
};
exports.LiveHeader = LiveHeader;
var styles = react_native_1.StyleSheet.create({
    container: __assign(__assign({}, defaultStyle_1.defaultStyle.spaceBetween), { marginVertical: (0, scaling_1.pixelSizeVertical)(10), paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(16), position: 'absolute', width: spacing_1.WIDTH_SCREEN, zIndex: 9999 }),
    wrapConcurrent: __assign(__assign({}, defaultStyle_1.defaultStyle.flexRow), { backgroundColor: colors_1.colors.BLACK_30, paddingHorizontal: (0, scaling_1.fontPixel)(8), paddingVertical: (0, scaling_1.fontPixel)(4), borderRadius: (0, scaling_1.fontPixel)(16), marginHorizontal: (0, scaling_1.fontPixel)(8) }),
});
