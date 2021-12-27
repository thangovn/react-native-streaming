import { ic_close } from '../assets/icons';
import { IconButton } from './IconButton';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, heightPixel, pixelSizeHorizontal, widthPixel } from '../utils/scaling';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConnectionStateType } from 'react-native-tvn-sdk';

const Header = ({ onPress, concurrent = 0, connection, peerIds }) => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={[styles.contain, { top: top + heightPixel(16) }]}>
            {connection === ConnectionStateType.Connected && Boolean(peerIds.length) && (
                <View style={styles.wrapConcurrent}>
                    <Text style={[defaultStyle.subButton, { color: colors.WHITE }]}>
                        {concurrent}
                    </Text>
                </View>
            )}
            <IconButton icon={ic_close} onPress={onPress} tintColor={colors.light.White} />
        </View>
    );
};

export default React.memo(Header);

const styles = StyleSheet.create({
    contain: {
        position: 'absolute',
        zIndex: 999,
        alignSelf: 'flex-end',
        paddingHorizontal: pixelSizeHorizontal(16),
        ...defaultStyle.flexRow,
    },
    wrapConcurrent: {
        backgroundColor: colors.light.DUSTY_GRAY,
        padding: fontPixel(4),
        borderRadius: fontPixel(10),
        marginHorizontal: pixelSizeHorizontal(8),
        minWidth: widthPixel(30),
        alignItems: 'center',
    },
});
