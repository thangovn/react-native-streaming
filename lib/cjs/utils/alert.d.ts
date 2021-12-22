export declare const alertOk: ({ msg, onPress, title }: {
    msg?: string;
    onPress?: () => void;
    title?: string;
}) => void;
export declare const alertYesNo: ({ title, msg, onPressAccept, text, onPressCancel, textCancel, }: {
    title?: string;
    msg?: string;
    onPressAccept?: () => void;
    text?: string;
    onPressCancel?: () => void;
    textCancel?: string;
}) => void;
