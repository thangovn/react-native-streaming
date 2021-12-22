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
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var spacing_1 = require("../constants/spacing");
var scaling_1 = require("../utils/scaling");
var lottie_react_native_1 = __importDefault(require("lottie-react-native"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var FontAwesome5_1 = __importDefault(require("react-native-vector-icons/FontAwesome5"));
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var GiftItem = function (_a) {
    var icon = _a.icon, name = _a.name, currency = _a.currency, onPress = _a.onPress, hasPicked = _a.hasPicked, giftQuantity = _a.giftQuantity, isGIF = _a.isGIF;
    var ref = (0, react_1.useRef)();
    var _b = (0, react_1.useState)(1), quantity = _b[0], setQuantity = _b[1];
    (0, react_1.useEffect)(function () {
        var interactionPromise = react_native_1.InteractionManager.runAfterInteractions(function () {
            return setTimeout(function () {
                var _a;
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.play();
            }, 1000);
        });
        return function () { return interactionPromise.cancel(); };
    }, []);
    var onPressMinus = function () {
        if (quantity === 1)
            return;
        if (quantity === 99) {
            setQuantity(9);
        }
        if (quantity === 9) {
            setQuantity(1);
        }
    };
    var onPressPlus = function () {
        if (quantity === 1) {
            setQuantity(9);
        }
        if (quantity === 9) {
            setQuantity(99);
        }
    };
    var borderColor = hasPicked ? colors_1.colors.light.INDIGO : colors_1.colors.light.TRANSPARENT;
    return (react_1.default.createElement(react_native_1.Pressable, { style: [styles.item, { borderColor: borderColor }], onPress: onPress },
        isGIF ? (react_1.default.createElement(react_native_fast_image_1.default, { source: { uri: icon }, style: hasPicked ? styles.icPicked : styles.icon, resizeMode: 'contain' })) : (react_1.default.createElement(lottie_react_native_1.default, { ref: ref, source: icon, autoSize: true, style: hasPicked ? styles.icPicked : styles.icon })),
        Boolean(giftQuantity) && react_1.default.createElement(GiftBadge, { count: giftQuantity }),
        hasPicked ? (react_1.default.createElement(react_native_1.View, { style: styles.wrapPicked },
            react_1.default.createElement(react_native_1.Text, { style: defaultStyle_1.defaultStyle.sub1 }, currency),
            react_1.default.createElement(react_native_1.View, { style: styles.wrapActionBtn },
                react_1.default.createElement(react_native_1.Pressable, { onPress: onPressMinus, hitSlop: {
                        top: (0, scaling_1.widthPixel)(20),
                        bottom: (0, scaling_1.widthPixel)(20),
                        right: (0, scaling_1.widthPixel)(20),
                        left: (0, scaling_1.widthPixel)(20),
                    } },
                    react_1.default.createElement(FontAwesome5_1.default, { name: 'minus-circle', color: quantity === 1 ? colors_1.colors.light.DOVE_GRAY : colors_1.colors.light.INDIGO })),
                react_1.default.createElement(react_native_1.Text, { style: defaultStyle_1.defaultStyle.sub1 }, quantity),
                react_1.default.createElement(react_native_1.Pressable, { onPress: onPressPlus, hitSlop: {
                        top: (0, scaling_1.widthPixel)(20),
                        bottom: (0, scaling_1.widthPixel)(20),
                        right: (0, scaling_1.widthPixel)(20),
                        left: (0, scaling_1.widthPixel)(20),
                    } },
                    react_1.default.createElement(FontAwesome5_1.default, { name: 'plus-circle', color: quantity === 99 ? colors_1.colors.light.DOVE_GRAY : colors_1.colors.light.INDIGO }))))) : (react_1.default.createElement(react_native_1.View, { style: styles.wrapInfoItem },
            react_1.default.createElement(react_native_1.Text, { style: defaultStyle_1.defaultStyle.subButton }, name),
            react_1.default.createElement(react_native_1.Text, { style: defaultStyle_1.defaultStyle.sub1 }, currency)))));
};
exports.default = react_1.default.memo(GiftItem);
var styles = react_native_1.StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: (0, scaling_1.fontPixel)(10),
        position: 'relative',
        width: spacing_1.WIDTH_SCREEN / 4 - (0, scaling_1.widthPixel)(8),
        height: spacing_1.WIDTH_SCREEN / 4 - (0, scaling_1.widthPixel)(8),
        marginVertical: (0, scaling_1.pixelSizeVertical)(8),
    },
    icon: {
        width: (0, scaling_1.widthPixel)(48),
        height: (0, scaling_1.heightPixel)(48),
    },
    icPicked: {
        width: (0, scaling_1.widthPixel)(60),
        height: (0, scaling_1.heightPixel)(60),
        position: 'absolute',
        top: (0, scaling_1.heightPixel)(-4),
    },
    wrapInfoItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: (0, scaling_1.heightPixel)(8),
    },
    wrapPicked: {
        justifyContent: 'flex-end',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: (0, scaling_1.fontPixel)(8),
    },
    wrapActionBtn: __assign(__assign({}, defaultStyle_1.defaultStyle.spaceBetween), { width: '100%' }),
    giftBadge: {
        backgroundColor: 'red',
        position: 'absolute',
        top: (0, scaling_1.heightPixel)(4),
        right: (0, scaling_1.widthPixel)(10),
        paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(4),
        borderRadius: (0, scaling_1.fontPixel)(4),
    },
    countText: __assign(__assign({}, defaultStyle_1.defaultStyle.sub1), { color: colors_1.colors.light.White }),
});
var GiftBadge = function (_a) {
    var count = _a.count;
    return (react_1.default.createElement(react_native_1.View, { style: styles.giftBadge },
        react_1.default.createElement(react_native_1.Text, { style: styles.countText }, count)));
};
