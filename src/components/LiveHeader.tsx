import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { WIDTH_SCREEN } from '../constants/spacing';
import { getTime } from '../utils/getTime';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

let time;
export const LiveHeader = ({ onPressCamera, onPressEndLive, concurrent = 0, joinSucceed }) => {
    const inset = useSafeAreaInsets();
    const [voiceTime, setVoiceTime] = useState(0);

    useEffect(() => {
        if (joinSucceed) {
            setVoiceTime(0);
            time = setInterval(() => {
                setVoiceTime(currentVoice => currentVoice + 1);
            }, 1000);
        }
        return () => clearInterval(time);
    }, [joinSucceed]);

    return (
        <View style={[styles.container, { top: inset.top + heightPixel(10) }]}>
            <View style={defaultStyle.flexRow}>
                <Pressable>
                    <FastImage
                        source={{
                            uri: 'https://cdn.pixabay.com/photo/2021/12/01/18/17/cat-6838844_960_720.jpg',
                        }}
                        style={defaultStyle.icon_36}
                    />
                </Pressable>
                <View style={styles.wrapConcurrent}>
                    <Icon name={'people-outline'} size={widthPixel(14)} color={colors.WHITE} />
                    <Text
                        style={[
                            defaultStyle.subButton,
                            { color: colors.WHITE, marginHorizontal: pixelSizeHorizontal(4) },
                        ]}>
                        {concurrent}
                    </Text>
                </View>
            </View>
            <View style={defaultStyle.flexRow}>
                <Icon
                    name={'camera-reverse-outline'}
                    size={widthPixel(28)}
                    color={colors.WHITE}
                    onPress={onPressCamera}
                />
                <View style={{ width: widthPixel(16) }} />
                <Text
                    style={[
                        defaultStyle.subButton,
                        { color: colors.WHITE, minWidth: widthPixel(40) },
                    ]}>
                    {getTime(voiceTime, true)}
                </Text>
                <View style={{ width: widthPixel(16) }} />
                <Icon
                    name={'power-outline'}
                    size={widthPixel(28)}
                    color={colors.WHITE}
                    onPress={onPressEndLive}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...defaultStyle.spaceBetween,
        marginVertical: pixelSizeVertical(10),
        paddingHorizontal: pixelSizeHorizontal(16),
        position: 'absolute',
        width: WIDTH_SCREEN,
        zIndex: 9999,
    },
    wrapConcurrent: {
        ...defaultStyle.flexRow,
        backgroundColor: colors.BLACK_30,
        paddingHorizontal: fontPixel(8),
        paddingVertical: fontPixel(4),
        borderRadius: fontPixel(16),
        marginHorizontal: fontPixel(8),
    },
});
