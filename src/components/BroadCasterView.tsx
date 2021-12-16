import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { RtcLocalView, VideoRenderMode } from 'react-native-agora';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';

const BroadCasterView = ({ renderWaitingView, joinSucceed, channelName }) => {
    return joinSucceed ? (
        <RtcLocalView.SurfaceView
            style={styles.video}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
        />
    ) : Boolean(renderWaitingView) ? (
        renderWaitingView()
    ) : (
        <View style={styles.video} />
    );
};

export default React.memo(BroadCasterView);

const styles = StyleSheet.create({
    video: {
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        backgroundColor: colors.light.MIRAGE,
    },
});
