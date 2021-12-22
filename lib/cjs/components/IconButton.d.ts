import { FC } from 'react';
import { ViewStyle } from 'react-native';
interface Props {
    icon?: number;
    onPress?: () => void;
    style?: ViewStyle;
    iconStyle?: any;
    tintColor?: string;
    iconVector?: string;
}
export declare const IconButton: FC<Props>;
export {};
