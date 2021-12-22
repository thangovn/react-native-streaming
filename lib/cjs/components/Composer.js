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
exports.refComposer = void 0;
var react_1 = __importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
var react_native_1 = require("react-native");
var Ionicons_1 = __importDefault(require("react-native-vector-icons/Ionicons"));
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var scaling_1 = require("../utils/scaling");
var LottieBox_1 = __importDefault(require("./LottieBox"));
exports.refComposer = react_1.default.createRef();
var Composer = function (_a) {
    var onSend = _a.onSend, source = _a.source;
    var _b = (0, react_hook_form_1.useForm)(), control = _b.control, handleSubmit = _b.handleSubmit, reset = _b.reset, errors = _b.formState.errors;
    (0, react_1.useImperativeHandle)(exports.refComposer, function () { return ({
        reset: reset,
    }); });
    return (react_1.default.createElement(react_native_1.View, { style: styles.contain },
        react_1.default.createElement(react_hook_form_1.Controller, { control: control, render: function (_a) {
                var _b = _a.field, onChange = _b.onChange, value = _b.value;
                return (react_1.default.createElement(react_native_1.View, { style: styles.wrapInput },
                    react_1.default.createElement(react_native_1.TextInput, { autoCorrect: false, placeholder: 'Say hello~~', style: styles.input, onChangeText: onChange, value: value, multiline: true, placeholderTextColor: colors_1.colors.light.Black }),
                    react_1.default.createElement(react_native_1.Pressable, { hitSlop: {
                            top: (0, scaling_1.widthPixel)(20),
                            bottom: (0, scaling_1.widthPixel)(20),
                            right: (0, scaling_1.widthPixel)(20),
                            left: (0, scaling_1.widthPixel)(20),
                        }, onPress: handleSubmit(onSend), style: { zIndex: 999 } },
                        react_1.default.createElement(Ionicons_1.default, { name: "send-outline", size: (0, scaling_1.widthPixel)(20), color: colors_1.colors.light.Black }))));
            }, name: "text", defaultValue: "" }),
        Boolean(source) && react_1.default.createElement(LottieBox_1.default, { source: source })));
};
exports.default = react_1.default.memo(Composer);
var styles = react_native_1.StyleSheet.create({
    wrapInput: __assign(__assign({}, defaultStyle_1.defaultStyle.spaceBetween), { backgroundColor: colors_1.colors.light.Zircon_2, borderRadius: (0, scaling_1.fontPixel)(16), flex: 0.9, paddingVertical: (0, scaling_1.pixelSizeVertical)(4), paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(8) }),
    input: __assign(__assign({ flex: 1, color: colors_1.colors.light.SHARK }, react_native_1.Platform.select({
        android: {
            padding: 0,
        },
    })), { maxHeight: 100 }),
    contain: __assign(__assign({}, defaultStyle_1.defaultStyle.flexRow), { justifyContent: 'space-between' }),
});
