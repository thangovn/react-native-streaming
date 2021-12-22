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
exports.refChatList = void 0;
var lotties_1 = require("../assets/lotties");
var giftType_1 = require("../enums/giftType");
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var spacing_1 = require("../constants/spacing");
var useKeyboard_1 = require("../hooks/useKeyboard");
var deviceInfo_1 = require("../utils/deviceInfo");
var scaling_1 = require("../utils/scaling");
var lodash_1 = require("lodash");
var lottie_react_native_1 = __importDefault(require("lottie-react-native"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var rn_android_keyboard_adjust_1 = __importDefault(require("rn-android-keyboard-adjust"));
var Composer_1 = __importDefault(require("./Composer"));
var GiftFlag_1 = __importDefault(require("./GiftFlag"));
var timeout;
exports.refChatList = react_1.default.createRef();
var ChatList = function (_a) {
    var data = _a.data, onSend = _a.onSend, rightIconComposer = _a.rightIconComposer, currentUserId = _a.currentUserId;
    var renderMessageItem = function (_a) {
        var item = _a.item, index = _a.index;
        var sameUser = parseInt((0, lodash_1.get)(item, 'user_id', 0)) === parseInt(currentUserId);
        return (react_1.default.createElement(react_native_1.View, { style: styles.messageItem },
            react_1.default.createElement(react_native_1.Text, { style: [
                    defaultStyle_1.defaultStyle.subButton,
                    { color: sameUser ? colors_1.colors.light.JAFFA : colors_1.colors.light.MainColor },
                ] }, "".concat(item.user_name, ": ")),
            react_1.default.createElement(react_native_1.Text, { style: styles.messageText }, item.message)));
    };
    var refLottie = (0, react_1.useRef)();
    var refConfetti = (0, react_1.useRef)();
    var _b = (0, react_1.useState)(), currentIcon = _b[0], setCurrentIcon = _b[1];
    (0, react_1.useImperativeHandle)(exports.refChatList, function () { return ({
        startAnimation: function (icon) {
            var _a, _b;
            (_a = refLottie.current) === null || _a === void 0 ? void 0 : _a.reset();
            (_b = refConfetti.current) === null || _b === void 0 ? void 0 : _b.reset();
            (0, react_native_reanimated_1.cancelAnimation)(scale);
            (0, react_native_reanimated_1.cancelAnimation)(right);
            (0, react_native_reanimated_1.cancelAnimation)(bottom);
            (0, react_native_reanimated_1.cancelAnimation)(opacity);
            (0, react_native_reanimated_1.cancelAnimation)(opacityConfetti);
            clearTimeout(timeout);
            setCurrentIcon(icon);
            timeout = setTimeout(function () {
                var _a, _b;
                (_a = refLottie.current) === null || _a === void 0 ? void 0 : _a.play();
                (_b = refConfetti.current) === null || _b === void 0 ? void 0 : _b.play();
                opacity.value = (0, react_native_reanimated_1.withTiming)(0, { duration: 8000 }, function () {
                    scale.value = 0;
                    opacity.value = 1;
                    bottom.value = 0;
                    right.value = 0;
                });
                opacityConfetti.value = (0, react_native_reanimated_1.withTiming)(0, { duration: 10000 }, function () {
                    opacityConfetti.value = 1;
                });
                scale.value = (0, react_native_reanimated_1.withTiming)(3, { duration: 1000 });
                bottom.value = (0, react_native_reanimated_1.withTiming)(spacing_1.HEIGHT_SCREEN / 1.5 - (0, scaling_1.heightPixel)(50), { duration: 500 });
                right.value = (0, react_native_reanimated_1.withTiming)(spacing_1.WIDTH_SCREEN / 2 - (0, scaling_1.widthPixel)(50), { duration: 500 });
            }, 600);
        },
    }); });
    var scale = (0, react_native_reanimated_1.useSharedValue)(0);
    var bottom = (0, react_native_reanimated_1.useSharedValue)(0);
    var right = (0, react_native_reanimated_1.useSharedValue)(0);
    var opacity = (0, react_native_reanimated_1.useSharedValue)(1);
    var opacityConfetti = (0, react_native_reanimated_1.useSharedValue)(1);
    var animationStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            transform: [{ scale: scale.value }],
            bottom: bottom.value,
            right: right.value,
            opacity: opacity.value,
        };
    });
    var animationConfettiStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            opacity: opacityConfetti.value,
        };
    });
    (0, react_1.useEffect)(function () {
        rn_android_keyboard_adjust_1.default.setAdjustResize();
        return function () { return rn_android_keyboard_adjust_1.default.setAdjustPan(); };
    }, []);
    var keyboardHeight = (0, useKeyboard_1.useKeyboard)().keyboardHeight;
    return (react_1.default.createElement(react_native_1.KeyboardAvoidingView, { behavior: deviceInfo_1.isIOS ? 'padding' : null, style: [
            styles.contain,
            __assign({}, react_native_1.Platform.select({
                android: {
                    bottom: keyboardHeight +
                        (0, scaling_1.heightPixel)(keyboardHeight > 0 ? (0, scaling_1.heightPixel)(24) : (0, scaling_1.heightPixel)(32)),
                },
            })),
        ] },
        react_1.default.createElement(react_native_reanimated_1.default.View, { style: [styles.box, animationStyle] }, !(0, lodash_1.isEmpty)(currentIcon) ? (react_1.default.createElement(react_1.default.Fragment, null, currentIcon.gift_data.gift_type === giftType_1.GiftType.GIF ? (react_1.default.createElement(react_native_fast_image_1.default, { source: { uri: (0, lodash_1.get)(currentIcon, 'gift_data.resource') }, style: react_native_1.StyleSheet.absoluteFill, resizeMode: 'contain' })) : (react_1.default.createElement(lottie_react_native_1.default, { ref: refLottie, source: (0, lodash_1.get)(currentIcon, 'gift_data.resource'), style: react_native_1.StyleSheet.absoluteFill, resizeMode: 'contain' })))) : null),
        react_1.default.createElement(react_native_reanimated_1.default.View, { style: [styles.wrapConfetti, animationConfettiStyle] },
            react_1.default.createElement(lottie_react_native_1.default, { loop: false, resizeMode: 'cover', ref: refConfetti, source: lotties_1.lottie_confetti, style: styles.lottieConfetti })),
        react_1.default.createElement(react_native_1.View, { style: styles.inner },
            react_1.default.createElement(GiftFlag_1.default, null),
            react_1.default.createElement(react_native_1.FlatList, { data: data, keyExtractor: function (item, index) { return "".concat(index); }, renderItem: renderMessageItem, inverted: true, style: styles.containFlatList, showsVerticalScrollIndicator: false }),
            react_1.default.createElement(Composer_1.default, { onSend: onSend, source: rightIconComposer }))));
};
exports.default = react_1.default.memo(ChatList);
var styles = react_native_1.StyleSheet.create({
    wrapConfetti: {
        width: spacing_1.WIDTH_SCREEN,
        height: spacing_1.HEIGHT_SCREEN,
        position: 'absolute',
    },
    inner: {
        padding: (0, scaling_1.fontPixel)(16),
        flex: 1,
        justifyContent: 'flex-end',
    },
    containFlatList: {
        maxHeight: (0, scaling_1.heightPixel)(300),
        zIndex: 999,
    },
    messageItem: __assign(__assign({}, defaultStyle_1.defaultStyle.flexRow), { backgroundColor: colors_1.colors.BLACK_30, marginVertical: (0, scaling_1.pixelSizeVertical)(4), borderRadius: (0, scaling_1.fontPixel)(20), paddingVertical: (0, scaling_1.pixelSizeVertical)(4), paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(8), alignSelf: 'flex-start' }),
    messageText: __assign(__assign({}, defaultStyle_1.defaultStyle.subButton), { color: colors_1.colors.light.White, alignSelf: 'flex-start', maxWidth: spacing_1.WIDTH_SCREEN / 1.5 }),
    contain: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    box: {
        width: (0, scaling_1.widthPixel)(100),
        height: (0, scaling_1.widthPixel)(100),
        position: 'absolute',
    },
    lottieConfetti: __assign({}, react_native_1.StyleSheet.absoluteFillObject),
});
