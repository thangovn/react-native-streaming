import { Status } from './enums/status';
import { defaultStyle } from './constants/defaultStyle';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { refComposer } from './components/Composer';
import GiftFlag from './components/GiftFlag';
import GiftListModal, { IGiftItem } from './components/GiftListModal';
import LiveStreamPlayer from './components/LiveStreamPlayer';
import SwipeList from './components/SwipeList';

const arr = new Array(50)
    .fill('')
    .map((item, index) => ({ id: index, username: 'David', message: 'Have a nice day!' }));
interface Props {
    status: Status;
    connection: any | {};
    onClose: () => void;
    iconBox?: string | number;
    data: IGiftItem[];
}

const LiveStreaming = ({ status, connection, onClose, iconBox, data }: Props) => {
    const [dataMessage, setDataMessage] = useState([...arr]);
    const regGiftFlag = useRef<any>();

    const onSend = ({ text }) => {
        if (!text) return;
        setDataMessage([{ id: Math.random(), username: 'David', message: text }, ...dataMessage]);
        refComposer.current?.reset();
    };

    const handleDonate = (gift: any) => {
        regGiftFlag.current?.startAnimation(gift.icon);
    };

    return (
        <View style={styles.container}>
            <LiveStreamPlayer status={status} onClose={onClose} connection={connection} />
            {status === Status.CONNECTED && (
                <>
                    <GiftFlag ref={regGiftFlag} />
                    <SwipeList dataMessage={dataMessage} onSend={onSend} iconBox={iconBox} />
                    <GiftListModal onDonate={handleDonate} data={data} />
                </>
            )}
        </View>
    );
};

export default React.memo(LiveStreaming);

const styles = StyleSheet.create({
    container: {
        ...defaultStyle.container,
    },
});
