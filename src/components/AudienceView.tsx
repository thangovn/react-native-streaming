import { IndicatorLoading } from './IndicatorLoading';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ConnectionStateType, RtcRemoteView, VideoRenderMode } from 'react-native-tvn';
import Header from './Header';

const AudienceView = ({ onClose, connection, concurrent, peerIds, channelName }) => {
    return (
        <>
            <Header
                onPress={onClose}
                concurrent={concurrent}
                connection={connection}
                peerIds={peerIds}
            />

            {connection === ConnectionStateType.Connecting ? (
                <View style={styles.flex}>
                    <Text style={styles.failText}>{'Connecting...'}</Text>
                </View>
            ) : connection === ConnectionStateType.Connected ? (
                !Boolean(peerIds.length) ? (
                    <View style={styles.flex}>
                        <Text style={styles.failText}>{'Stream Not Available'}</Text>
                    </View>
                ) : (
                    <RtcRemoteView.SurfaceView
                        style={styles.remoteView}
                        uid={peerIds[0]}
                        channelId={channelName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={true}
                    />
                )
            ) : connection === ConnectionStateType.Disconnected ? (
                <View style={styles.flex}>
                    <Text style={styles.failText}>{'Stream Disconnected'}</Text>
                </View>
            ) : (
                <View style={styles.flex}>
                    <Text style={styles.failText}>{'Stream Closed'}</Text>
                </View>
            )}
        </>
    );
};

export default React.memo(AudienceView);

const styles = StyleSheet.create({
    failText: {
        ...defaultStyle.button2,
        color: colors.light.White,
    },
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
