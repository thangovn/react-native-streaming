import Pressable from './Pressable';
import { defaultStyle } from '../constants/defaultStyle';
import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPixel } from '../utils/scaling';
import { colors } from '../constants/colors';

interface Props {
    icon?: number;
    onPress?: () => void;
    style?: ViewStyle;
    iconStyle?: any;
    tintColor?: string;
    iconVector?: string;
}
export const IconButton: FC<Props> = ({
    icon,
    onPress,
    style,
    iconStyle,
    tintColor,
    iconVector,
}) => {
    return (
        <Pressable onPress={onPress} style={style}>
            {Boolean(iconVector) ? (
                <Icon
                    name={iconVector}
                    size={widthPixel(28)}
                    color={colors.WHITE}
                    onPress={onPress}
                    style={{ marginLeft: widthPixel(8) }}
                />
            ) : (
                <FastImage
                    source={icon}
                    style={[defaultStyle.icon_24, iconStyle]}
                    tintColor={tintColor}
                />
            )}
        </Pressable>
    );
};
