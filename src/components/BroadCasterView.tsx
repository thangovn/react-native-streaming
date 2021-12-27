import React from 'react';
import { StyleSheet } from 'react-native';
import { RtcLocalView, VideoRenderMode } from '../../tvn/index';
import FastImage from 'react-native-fast-image';
import { colors } from '../constants/colors';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';

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
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        backgroundColor: colors.light.MIRAGE,
    },
});
