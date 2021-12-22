import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { RtcLocalView, VideoRenderMode } from 'react-native-agora';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
var BroadCasterView = function (_a) {
    var renderWaitingView = _a.renderWaitingView, joinSucceed = _a.joinSucceed, channelName = _a.channelName;
    return joinSucceed ? (React.createElement(RtcLocalView.SurfaceView, { style: styles.video, channelId: channelName, renderMode: VideoRenderMode.Hidden })) : Boolean(renderWaitingView) ? (renderWaitingView()) : (React.createElement(View, { style: styles.video }));
};
export default React.memo(BroadCasterView);
var styles = StyleSheet.create({
    video: {
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        backgroundColor: colors.light.MIRAGE,
    },
});
