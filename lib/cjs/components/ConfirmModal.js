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
exports.refConfirmModal = void 0;
var Pressable_1 = __importDefault(require("../components/Pressable"));
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var scaling_1 = require("../utils/scaling");
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_modal_1 = __importDefault(require("react-native-modal"));
exports.refConfirmModal = react_1.default.createRef();
var ConfirmModal = function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    (0, react_1.useImperativeHandle)(exports.refConfirmModal, function () { return ({
        open: function () { return setVisible(true); },
        close: function () { return setVisible(false); },
    }); });
    return (react_1.default.createElement(react_native_modal_1.default, { isVisible: visible, useNativeDriver: true, hideModalContentWhileAnimating: true },
        react_1.default.createElement(react_native_1.View, { style: styles.body },
            react_1.default.createElement(react_native_1.Text, { style: styles.content }, 'Your current balance is not enough and need to top up at least 9999 diamonds to complete the purchase'),
            react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.flexRow },
                react_1.default.createElement(Button, { name: 'Cancel', isOutLine: true, onPress: function () { return setVisible(false); } }),
                react_1.default.createElement(react_native_1.View, { style: { width: (0, scaling_1.widthPixel)(8) } }),
                react_1.default.createElement(Button, { name: 'Top-up', onPress: function () { return setVisible(false); } })))));
};
exports.default = react_1.default.memo(ConfirmModal);
var styles = react_native_1.StyleSheet.create({
    btn: {
        borderRadius: (0, scaling_1.fontPixel)(10),
        borderWidth: 0.5,
        borderColor: colors_1.colors.light.JAFFA,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: (0, scaling_1.heightPixel)(42),
        backgroundColor: colors_1.colors.light.JAFFA,
    },
    outline: {
        borderWidth: 0.5,
        borderColor: colors_1.colors.light.INDIGO,
        borderRadius: (0, scaling_1.fontPixel)(8),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: (0, scaling_1.heightPixel)(42),
    },
    body: {
        backgroundColor: colors_1.colors.light.White,
        padding: (0, scaling_1.fontPixel)(16),
        borderRadius: (0, scaling_1.fontPixel)(16),
    },
    content: __assign(__assign({}, defaultStyle_1.defaultStyle.subButton), { color: colors_1.colors.light.SHARK, marginBottom: (0, scaling_1.heightPixel)(16) }),
});
var Button = function (_a) {
    var name = _a.name, onPress = _a.onPress, _b = _a.isOutLine, isOutLine = _b === void 0 ? false : _b;
    return (react_1.default.createElement(Pressable_1.default, { onPress: onPress, style: isOutLine ? styles.outline : styles.btn },
        react_1.default.createElement(react_native_1.Text, { style: [
                defaultStyle_1.defaultStyle.body,
                { color: isOutLine ? colors_1.colors.light.INDIGO : colors_1.colors.light.White },
            ] }, name)));
};
