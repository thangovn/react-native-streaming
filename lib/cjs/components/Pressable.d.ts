import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    onPress?: () => void;
    style?: StyleProp<ViewStyle> | undefined;
    [x: string]: any;
}
declare const Pressable: FC<Props>;
export default Pressable;
