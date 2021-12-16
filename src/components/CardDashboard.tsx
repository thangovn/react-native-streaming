import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, pixelSizeHorizontal, widthPixel } from '../utils/scaling';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { pixelSizeVertical } from 'react-native-streaming/src/utils/scaling';
import Icon from 'react-native-vector-icons/Ionicons';

const CardDashboard = ({ onSelectGame, url, nameGame, channelLive }) => {
    return (
        <View style={styles.container}>
            <FastImage source={{ uri: url }} style={styles.img} />
            <View style={styles.wrapRight}>
                <TextInput
                    style={styles.input}
                    placeholder={'Live chanel...'}
                    placeholderTextColor={colors.light.DUSTY_GRAY}
                    value={channelLive}
                />
                <View style={{ flex: 1 }} />
                <Pressable style={defaultStyle.flexRow} onPress={onSelectGame}>
                    <Text style={styles.input}>{nameGame}</Text>
                    <Icon
                        name={'chevron-forward-outline'}
                        size={widthPixel(15)}
                        color={colors.WHITE}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default React.memo(CardDashboard);

const styles = StyleSheet.create({
    img: {
        width: widthPixel(56),
        height: widthPixel(56),
        borderRadius: fontPixel(10),
    },
    container: {
        ...defaultStyle.flexRow,
        backgroundColor: colors.BLACK_30,
        padding: fontPixel(8),
        marginHorizontal: pixelSizeHorizontal(16),
        marginTop: pixelSizeVertical(6),
        borderRadius: fontPixel(4),
    },
    wrapRight: {
        marginHorizontal: fontPixel(8),
    },
    input: {
        ...defaultStyle.button2,
        color: colors.WHITE,
    },
});
