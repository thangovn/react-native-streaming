"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var colors_1 = require("../constants/colors");
var react_native_agora_1 = require("react-native-agora");
var spacing_1 = require("../constants/spacing");
var BroadCasterView = function (_a) {
    var renderWaitingView = _a.renderWaitingView, joinSucceed = _a.joinSucceed, channelName = _a.channelName;
    return joinSucceed ? (react_1.default.createElement(react_native_agora_1.RtcLocalView.SurfaceView, { style: styles.video, channelId: channelName, renderMode: react_native_agora_1.VideoRenderMode.Hidden })) : Boolean(renderWaitingView) ? (renderWaitingView()) : (react_1.default.createElement(react_native_1.View, { style: styles.video }));
};
exports.default = react_1.default.memo(BroadCasterView);
var styles = react_native_1.StyleSheet.create({
    video: {
        position: 'absolute',
        width: spacing_1.WIDTH_SCREEN,
        height: spacing_1.HEIGHT_SCREEN,
        backgroundColor: colors_1.colors.light.MIRAGE,
    },
});
