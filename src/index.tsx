import React, { FC, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { refComposer } from './components/Composer';
import { IGiftItem } from './components/GiftListModal';
import withViewerStreaming from './hoc/withViewerStreaming';
import { useWebSockets } from './hooks/useWebSockets';
import LiveStreaming from './LiveStreaming';

interface Props {
    onCloseStream: () => void;
    onReceiveGift: (gift: any) => void;
    data: IGiftItem[];
    iconBox?: string | number;
    configLiveStream: {
        appId: string;
        channelName: string;
    };
    _userInfoSocketChat: {
        user_name: string;
        user_id: number;
        chanel_id: string;
    };
}
const ReactNativeStream: FC<Props> = props => {
    const {
        iconBox,
        onCloseStream,
        onReceiveGift,
        data,
        configLiveStream: { appId, channelName },
        _userInfoSocketChat,
    } = props;

    const init = async () => {
        await props.init(appId);

        setTimeout(() => {
            props.startCall(channelName);
        }, 2000);
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        const backAction = () => {
            onClose();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    const onClose = async () => {
        await props.endCall();
        setTimeout(() => {
            onCloseStream?.();
        }, 500);
    };

    const onSend = ({ text }) => {
        if (!text) return;
        send({ message: text });
        refComposer.current?.reset();
    };

    const handleDonate = (gift: any) => {
        send_gift(gift);
    };

    const { send, messages, concurrent, send_gift } = useWebSockets({
        enabled: true,
        _userInfo: _userInfoSocketChat,
        onReceiveGift,
    });

    return (
        <LiveStreaming
            onDonate={handleDonate}
            onSend={onSend}
            iconBox={iconBox}
            onClose={onClose}
            data={data}
            messages={messages}
            concurrent={concurrent}
            {...props}
        />
    );
};

export default withViewerStreaming(ReactNativeStream);
