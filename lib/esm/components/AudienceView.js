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
import { IndicatorLoading } from './IndicatorLoading';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ConnectionStateType, RtcRemoteView, VideoRenderMode } from 'react-native-agora';
import Header from './Header';
var AudienceView = function (_a) {
    var onClose = _a.onClose, connection = _a.connection, concurrent = _a.concurrent, peerIds = _a.peerIds, channelName = _a.channelName;
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, { onPress: onClose, concurrent: concurrent, connection: connection, peerIds: peerIds }),
        connection === ConnectionStateType.Connecting ? (React.createElement(IndicatorLoading, { backgroundColor: colors.light.MIRAGE })) : connection === ConnectionStateType.Connected && Boolean(peerIds.length) ? (React.createElement(RtcRemoteView.SurfaceView, { style: styles.remoteView, uid: peerIds[0], channelId: channelName, renderMode: VideoRenderMode.Hidden, zOrderMediaOverlay: true })) : connection === ConnectionStateType.Disconnected ? (React.createElement(View, { style: styles.flex },
            React.createElement(Text, { style: styles.failText }, 'Stream Disconnected'))) : (React.createElement(View, { style: styles.flex },
            React.createElement(Text, { style: styles.failText }, 'Stream Closed')))));
};
export default React.memo(AudienceView);
var styles = StyleSheet.create({
    failText: __assign(__assign({}, defaultStyle.button2), { color: colors.light.White }),
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light.MIRAGE,
    },
    remoteView: {
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
    },
});
