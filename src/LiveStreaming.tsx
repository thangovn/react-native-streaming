import { defaultStyle } from '@constants/defaultStyle';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ConnectionStateType } from 'react-native-agora';
import GiftFlag from './components/GiftFlag';
import GiftListModal from './components/GiftListModal';
import LiveStreamPlayer from './components/LiveStreamPlayer';
import SwipeList from './components/SwipeList';

const RoomDetailComp = props => {
    const { onClose, onSend, messages, onDonate, giftData, iconBox, concurrent, ...otherProps } =
        props;
    return (
        <View style={styles.container}>
            <LiveStreamPlayer
                onClose={onClose}
                connection={otherProps.connectionState}
                concurrent={concurrent}
                peerIds={otherProps.peerIds}
                channelName={otherProps.channelName}
            />
            {otherProps.connectionState === ConnectionStateType.Connected &&
                Boolean(otherProps.peerIds.length) && (
                    <>
                        <GiftFlag />
                        <SwipeList dataMessage={messages} onSend={onSend} iconBox={iconBox} />
                        <GiftListModal onDonate={onDonate} data={giftData} />
                    </>
                )}
        </View>
    );
};

export default React.memo(RoomDetailComp);

const styles = StyleSheet.create({
    container: {
        ...defaultStyle.container,
    },
});
