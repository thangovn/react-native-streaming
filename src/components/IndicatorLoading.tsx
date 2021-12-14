import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const IndicatorLoading = ({ backgroundColor = colors.light.White }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ActivityIndicator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...defaultStyle.container,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
