import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/scaling';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export const HeaderHost = ({ onPressAvatar, onPressShare, onPressHelp }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={onPressAvatar}>
                <FastImage
                    source={{
                        uri: 'https://cdn.pixabay.com/photo/2021/12/01/18/17/cat-6838844_960_720.jpg',
                    }}
                    style={defaultStyle.icon_36}
                />
            </Pressable>
            <View style={defaultStyle.flexRow}>
                <Icon
                    name={'share-social-outline'}
                    size={widthPixel(28)}
                    color={colors.WHITE}
                    onPress={onPressShare}
                />
                <View style={{ width: widthPixel(16) }} />
                <Icon
                    name={'help-circle-outline'}
                    size={widthPixel(28)}
                    color={colors.WHITE}
                    onPress={onPressHelp}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...defaultStyle.spaceBetween,
        marginHorizontal: pixelSizeHorizontal(16),
        marginVertical: pixelSizeVertical(10),
    },
});
