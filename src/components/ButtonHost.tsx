import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, heightPixel, pixelSizeVertical, widthPixel } from '../utils/scaling';

const ButtonHost = ({ name, onPress, disabled = false, backgroundColor }) => {
    return (
        <Pressable onPress={onPress} style={[styles.btn, { backgroundColor }]} disabled={disabled}>
            <Text style={[defaultStyle.body, { color: colors.WHITE }]}>{name}</Text>
        </Pressable>
    );
};

export default React.memo(ButtonHost);

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.light.INDIGO,
        alignSelf: 'center',
        paddingVertical: pixelSizeVertical(8),
        width: widthPixel(150),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontPixel(8),
        marginBottom: heightPixel(32),
    },
});
