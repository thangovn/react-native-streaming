import React, { FC } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';
interface Props {
    centerName?: string;
    leftComponent?: () => JSX.Element;
    rightComponent?: {
        icon: string;
        onPress: () => void;
        tintColor?: string;
    }[] | Function;
    onPressSearch?: () => void;
    edges?: Edge;
    centerTextStyle?: TextStyle;
    itemStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    centerStyle?: ViewStyle;
    leftViewStyle?: ViewStyle;
    tintColorLeftIcon?: string;
    onBack?: () => void;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
interface IItem {
    onPress: () => void;
    icon: string;
    tintColor?: string;
    containerStyle?: ViewStyle | any;
}
export declare const Item: FC<IItem>;
