import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RtcLocalView, VideoRenderMode } from 'react-native-tvn-host';
import { colors } from '../constants/colors';

const BroadCasterView = ({ renderWaitingView, joinSucceed, channelName, thumbnail }) => {
    return joinSucceed ? (
        <RtcLocalView.SurfaceView
            style={styles.video}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
        />
    ) : Boolean(renderWaitingView) ? (
        renderWaitingView()
    ) : (
        <FastImage source={{ uri: thumbnail }} style={styles.video} />
    );
};

export default React.memo(BroadCasterView);

const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.light.MIRAGE,
        zIndex: -999,
    },
});
