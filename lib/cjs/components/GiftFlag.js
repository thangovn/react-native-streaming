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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refGiftFlag = void 0;
var lodash_1 = require("lodash");
var lottie_react_native_1 = __importDefault(require("lottie-react-native"));
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var spacing_1 = require("../constants/spacing");
var giftType_1 = require("../enums/giftType");
var scaling_1 = require("../utils/scaling");
var timeout;
exports.refGiftFlag = react_1.default.createRef();
var GiftFlag = function (_a) {
    var a = (0, react_native_reanimated_1.useSharedValue)(spacing_1.WIDTH_SCREEN);
    var opacity = (0, react_native_reanimated_1.useSharedValue)(1);
    var animationStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () {
        return {
            transform: [{ translateX: a.value }],
            opacity: opacity.value,
        };
    });
    var _b = (0, react_1.useState)(), currentIcon = _b[0], setCurrentIcon = _b[1];
    (0, react_1.useImperativeHandle)(exports.refGiftFlag, function () { return ({
        startAnimation: startAnimation,
    }); });
    var startAnimation = function (lottieIcon) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, react_native_reanimated_1.cancelAnimation)(a);
            (0, react_native_reanimated_1.cancelAnimation)(opacity);
            clearTimeout(timeout);
            setCurrentIcon(lottieIcon);
            timeout = setTimeout(function () {
                a.value = (0, react_native_reanimated_1.withSpring)(0);
                a.value = (0, react_native_reanimated_1.withDelay)(5000, (0, react_native_reanimated_1.withSpring)(-spacing_1.WIDTH_SCREEN));
                opacity.value = (0, react_native_reanimated_1.withDelay)(2000, (0, react_native_reanimated_1.withTiming)(0, { duration: 5500 }, function () {
                    opacity.value = 1;
                    a.value = spacing_1.WIDTH_SCREEN;
                }));
            }, 500);
            return [2 /*return*/];
        });
    }); };
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [styles.sendItem, animationStyle] },
        react_1.default.createElement(react_native_1.View, { style: styles.wrapGiftFlag },
            react_1.default.createElement(react_native_linear_gradient_1.default, { style: styles.linear, start: { x: 0, y: 0 }, end: { x: 1.4, y: 0 }, colors: [
                    colors_1.colors.light.INDIGO,
                    colors_1.colors.light.ASTRAL,
                    colors_1.colors.light.AZURE_RADIANCE_2,
                    colors_1.colors.light.TRANSPARENT,
                ] }),
            react_1.default.createElement(react_native_1.Text, { style: [defaultStyle_1.defaultStyle.subButton, { color: colors_1.colors.light.White }] }, "".concat((0, lodash_1.get)(currentIcon, 'user_name', 'Thuan'), " send ")),
            !(0, lodash_1.isEmpty)(currentIcon) ? (currentIcon.gift_data.gift_type === giftType_1.GiftType.GIF ? (react_1.default.createElement(react_native_fast_image_1.default, { source: { uri: (0, lodash_1.get)(currentIcon, 'gift_data.resource') }, style: styles.lottieIcon, resizeMode: 'contain' })) : (react_1.default.createElement(lottie_react_native_1.default, { autoPlay: true, source: { uri: (0, lodash_1.get)(currentIcon, 'gift_data.resource') }, style: styles.lottieIcon, resizeMode: 'contain' }))) : null,
            react_1.default.createElement(react_native_1.Text, { style: styles.count }, "x ".concat((0, lodash_1.get)(currentIcon, 'quantity', 999))))));
};
exports.default = react_1.default.memo(GiftFlag);
var styles = react_native_1.StyleSheet.create({
    sendItem: {
        marginBottom: (0, scaling_1.pixelSizeVertical)(16),
    },
    wrapGiftFlag: __assign({ width: spacing_1.WIDTH_SCREEN / 1.7, height: (0, scaling_1.heightPixel)(36), paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(16), overflow: 'visible' }, defaultStyle_1.defaultStyle.flexRow),
    linear: __assign(__assign({}, react_native_1.StyleSheet.absoluteFillObject), { borderRadius: (0, scaling_1.fontPixel)(20) }),
    lottieIcon: {
        width: (0, scaling_1.widthPixel)(48),
        height: (0, scaling_1.widthPixel)(48),
    },
    count: __assign(__assign({}, defaultStyle_1.defaultStyle.button1), { color: colors_1.colors.light.SUPPER_NOVA }),
});
