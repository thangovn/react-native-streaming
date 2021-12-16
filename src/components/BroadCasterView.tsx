import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';
import { RtcLocalView, VideoRenderMode } from 'react-native-agora';

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
        <View style={styles.flex} />
    );
};

export default React.memo(BroadCasterView);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light.MIRAGE,
    },
});
