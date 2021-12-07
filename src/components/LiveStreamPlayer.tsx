import { IndicatorLoading } from '@components/IndicatorLoading';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import Header from './Header';

const LiveStreamPlayer = ({ status = 'connecting', onClose, connection }) => {
    return (
        <>
            <Header onPress={onClose} />
            {status === 'connecting' ? (
                <IndicatorLoading backgroundColor={colors.light.MIRAGE} />
            ) : status === 'connected' ? (
                <RTCView streamURL={connection?.stream?.toURL()} style={styles.img} />
            ) : status === 'fail' ? (
                <View style={styles.flex}>
                    <Text style={styles.failText}>{'Stream Lost Connect'}</Text>
                </View>
            ) : (
                <View style={styles.flex}>
                    <Text style={styles.failText}>{'Stream has closed'}</Text>
                </View>
            )}
        </>
    );
};

export default React.memo(LiveStreamPlayer);

const styles = StyleSheet.create({
    img: {
        transform: [{ scale: 4 }],
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
    },
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
});
