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
var IndicatorLoading_1 = require("./IndicatorLoading");
var colors_1 = require("../constants/colors");
var defaultStyle_1 = require("../constants/defaultStyle");
var spacing_1 = require("../constants/spacing");
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_agora_1 = require("react-native-agora");
var Header_1 = __importDefault(require("./Header"));
var AudienceView = function (_a) {
    var onClose = _a.onClose, connection = _a.connection, concurrent = _a.concurrent, peerIds = _a.peerIds, channelName = _a.channelName;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.default, { onPress: onClose, concurrent: concurrent, connection: connection, peerIds: peerIds }),
        connection === react_native_agora_1.ConnectionStateType.Connecting ? (react_1.default.createElement(IndicatorLoading_1.IndicatorLoading, { backgroundColor: colors_1.colors.light.MIRAGE })) : connection === react_native_agora_1.ConnectionStateType.Connected && Boolean(peerIds.length) ? (react_1.default.createElement(react_native_agora_1.RtcRemoteView.SurfaceView, { style: styles.remoteView, uid: peerIds[0], channelId: channelName, renderMode: react_native_agora_1.VideoRenderMode.Hidden, zOrderMediaOverlay: true })) : connection === react_native_agora_1.ConnectionStateType.Disconnected ? (react_1.default.createElement(react_native_1.View, { style: styles.flex },
            react_1.default.createElement(react_native_1.Text, { style: styles.failText }, 'Stream Disconnected'))) : (react_1.default.createElement(react_native_1.View, { style: styles.flex },
            react_1.default.createElement(react_native_1.Text, { style: styles.failText }, 'Stream Closed')))));
};
exports.default = react_1.default.memo(AudienceView);
var styles = react_native_1.StyleSheet.create({
    failText: __assign(__assign({}, defaultStyle_1.defaultStyle.button2), { color: colors_1.colors.light.White }),
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors_1.colors.light.MIRAGE,
    },
    remoteView: {
        position: 'absolute',
        width: spacing_1.WIDTH_SCREEN,
        height: spacing_1.HEIGHT_SCREEN,
    },
});
