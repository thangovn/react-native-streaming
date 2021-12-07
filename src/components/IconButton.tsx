import Pressable from './Pressable';
import { defaultStyle } from '../constants/defaultStyle';
import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
    icon: number;
    onPress?: () => void;
    style?: ViewStyle;
    iconStyle?: any;
    tintColor?: string;
}
export const IconButton: FC<Props> = ({ icon, onPress, style, iconStyle, tintColor }) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <FastImage
                source={icon}
                style={[defaultStyle.icon_24, iconStyle]}
                tintColor={tintColor}
            />
        </Pressable>
    );
};
