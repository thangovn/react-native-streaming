import { ic_close } from '../assets/icons';
import { IconButton } from './IconButton';
import { colors } from '../constants/colors';
import { heightPixel, pixelSizeHorizontal } from '../utils/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ onPress }) => {
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={[styles.contain, { top: bottom + heightPixel(16) }]}>
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
    },
});
