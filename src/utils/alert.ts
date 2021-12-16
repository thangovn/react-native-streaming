import { Alert } from 'react-native';

export const alertOk = ({ msg = '', onPress = () => {}, title = 'Notice' }) => {
    return Alert.alert(title, msg, [{ text: 'OK', onPress: onPress }]);
};

export const alertYesNo = ({
    title = 'Notice',
    msg = '',
    onPressAccept = () => {},
    text = 'OK',
    onPressCancel = () => {},
    textCancel = 'Cancel',
}) => {
    return Alert.alert(title, msg, [
        {
            text: textCancel,
            onPress: onPressCancel,
            style: 'cancel',
        },
        { text, onPress: onPressAccept },
    ]);
};
