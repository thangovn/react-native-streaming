import React, { FC } from 'react';
import { Pressable as RNPressable, StyleProp, ViewStyle } from 'react-native';

interface Props {
    onPress?: () => void;
    style?: StyleProp<ViewStyle> | undefined;
    [x: string]: any;
}
const Pressable: FC<Props> = props => {
    const { children, onPress, style, ...otherProps } = props;
    return (
        <RNPressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
            onPress={onPress}
            {...otherProps}>
            {children}
        </RNPressable>
    );
};

export default Pressable;
