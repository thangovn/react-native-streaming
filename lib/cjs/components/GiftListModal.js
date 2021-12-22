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
exports.refGiftModal = void 0;
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_modal_1 = __importDefault(require("react-native-modal"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var FontAwesome5_1 = __importDefault(require("react-native-vector-icons/FontAwesome5"));
var Pressable_1 = __importDefault(require("../components/Pressable"));
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var giftType_1 = require("../enums/giftType");
var scaling_1 = require("../utils/scaling");
var ConfirmModal_1 = __importStar(require("./ConfirmModal"));
var GiftItem_1 = __importDefault(require("./GiftItem"));
exports.refGiftModal = react_1.default.createRef();
var GiftListModal = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, onDonate = _a.onDonate;
    var _c = (0, react_1.useState)(false), visible = _c[0], setVisible = _c[1];
    (0, react_1.useImperativeHandle)(exports.refGiftModal, function () { return ({
        open: function () { return setVisible(true); },
        close: function () { return setVisible(false); },
    }); });
    var _d = (0, react_1.useState)(null), currentGift = _d[0], setCurrentGift = _d[1];
    var renderGiftItem = function (_a) {
        var item = _a.item, index = _a.index;
        return (react_1.default.createElement(GiftItem_1.default, { isGIF: item.gift_type === giftType_1.GiftType.GIF, giftQuantity: item.quantity_remain, icon: item.resource, name: item.name, currency: item.coin, onPress: function () { return onPressGiftItem(item); }, hasPicked: (item === null || item === void 0 ? void 0 : item.id) === (currentGift === null || currentGift === void 0 ? void 0 : currentGift.id) }));
    };
    var onPressGiftItem = function (item) {
        setCurrentGift(item);
        a.value = (0, react_native_reanimated_1.withTiming)(0, { duration: 500 });
    };
    var onBackdrop = function () {
        setVisible(false);
        setCurrentGift(null);
    };
    var pressDonate = (0, lodash_1.debounce)(function () {
        var _a;
        if (!currentGift) {
            a.value = (0, react_native_reanimated_1.withTiming)(1, { duration: 500 });
            return;
        }
        if (currentGift.quantity_remain) {
            onDonate === null || onDonate === void 0 ? void 0 : onDonate(currentGift);
            setVisible(false);
            setCurrentGift(null);
        }
        else {
            (_a = ConfirmModal_1.refConfirmModal.current) === null || _a === void 0 ? void 0 : _a.open();
        }
    }, 500);
    var a = (0, react_native_reanimated_1.useSharedValue)(0);
    var aniStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            opacity: a.value,
        };
    });
    return (react_1.default.createElement(react_native_modal_1.default, { isVisible: visible, style: styles.modal, onBackdropPress: onBackdrop, backdropOpacity: 0, useNativeDriver: true, hideModalContentWhileAnimating: true, animationOutTiming: 500 },
        react_1.default.createElement(react_native_1.View, { style: styles.body },
            react_1.default.createElement(react_native_1.FlatList, { numColumns: 4, renderItem: renderGiftItem, keyExtractor: function (item, index) { return "".concat(index); }, data: data }),
            react_1.default.createElement(react_native_1.View, { style: styles.wrapWallet },
                react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.flexRow },
                    react_1.default.createElement(FontAwesome5_1.default, { name: 'gem' }),
                    react_1.default.createElement(react_native_1.Text, { style: defaultStyle_1.defaultStyle.subButton2 }, ' 1500 $')),
                react_1.default.createElement(react_native_reanimated_1.default.Text, { style: [styles.alertGift, aniStyle] }, 'Please choose a gift!'),
                react_1.default.createElement(Pressable_1.default, { style: styles.wrapDonate, onPress: pressDonate },
                    react_1.default.createElement(react_native_1.Text, { style: styles.donateText }, 'Donate'))),
            react_1.default.createElement(ConfirmModal_1.default, null))));
};
exports.default = react_1.default.memo(GiftListModal);
var styles = react_native_1.StyleSheet.create({
    donateText: __assign(__assign({}, defaultStyle_1.defaultStyle.subButton), { color: colors_1.colors.light.White }),
    body: {
        backgroundColor: colors_1.colors.light.White,
        padding: (0, scaling_1.fontPixel)(16),
        borderTopLeftRadius: (0, scaling_1.fontPixel)(16),
        borderTopRightRadius: (0, scaling_1.fontPixel)(16),
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    wrapWallet: __assign(__assign({}, defaultStyle_1.defaultStyle.spaceBetween), { marginVertical: (0, scaling_1.heightPixel)(16) }),
    wrapDonate: {
        backgroundColor: colors_1.colors.light.INDIGO,
        borderRadius: (0, scaling_1.fontPixel)(16),
        paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(8),
        paddingVertical: (0, scaling_1.pixelSizeVertical)(4),
    },
    box: {
        zIndex: 99999,
        width: (0, scaling_1.widthPixel)(50),
        height: (0, scaling_1.widthPixel)(50),
        // backgroundColor: 'red',
        position: 'absolute',
    },
    alertGift: __assign(__assign({}, defaultStyle_1.defaultStyle.subButton2), { color: colors_1.colors.light.Badge }),
});
