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
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var scaling_1 = require("../utils/scaling");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var Ionicons_1 = __importDefault(require("react-native-vector-icons/Ionicons"));
var CardDashboard = function (_a) {
    var onSelectGame = _a.onSelectGame, url = _a.url, nameGame = _a.nameGame, channelLive = _a.channelLive;
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_fast_image_1.default, { source: { uri: url }, style: styles.img }),
        react_1.default.createElement(react_native_1.View, { style: styles.wrapRight },
            react_1.default.createElement(react_native_1.TextInput, { style: styles.input, placeholder: 'Live chanel...', placeholderTextColor: colors_1.colors.light.DUSTY_GRAY, value: channelLive }),
            react_1.default.createElement(react_native_1.View, { style: { flex: 1 } }),
            react_1.default.createElement(react_native_1.Pressable, { style: defaultStyle_1.defaultStyle.flexRow, onPress: onSelectGame },
                react_1.default.createElement(react_native_1.Text, { style: styles.input }, nameGame),
                react_1.default.createElement(Ionicons_1.default, { name: 'chevron-forward-outline', size: (0, scaling_1.widthPixel)(15), color: colors_1.colors.WHITE })))));
};
exports.default = react_1.default.memo(CardDashboard);
var styles = react_native_1.StyleSheet.create({
    img: {
        width: (0, scaling_1.widthPixel)(56),
        height: (0, scaling_1.widthPixel)(56),
        borderRadius: (0, scaling_1.fontPixel)(10),
    },
    container: __assign(__assign({}, defaultStyle_1.defaultStyle.flexRow), { backgroundColor: colors_1.colors.BLACK_30, padding: (0, scaling_1.fontPixel)(8), marginHorizontal: (0, scaling_1.pixelSizeHorizontal)(16), marginTop: (0, scaling_1.pixelSizeVertical)(6), borderRadius: (0, scaling_1.fontPixel)(4) }),
    wrapRight: {
        marginHorizontal: (0, scaling_1.fontPixel)(8),
    },
    input: __assign(__assign({}, defaultStyle_1.defaultStyle.button2), { color: colors_1.colors.WHITE }),
});
