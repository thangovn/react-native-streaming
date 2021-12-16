import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { refComposer } from './components/Composer';
import GiftListModal, { IGiftItem } from './components/GiftListModal';
import { ConnectionStateType } from 'react-native-agora';
import { useWebSockets } from './hooks/useWebSockets';
import GiftFlag, { refGiftFlag } from './components/GiftFlag';
import SwipeList from './components/SwipeList';
import withAudienceStreaming from './hoc/withAudienceStreaming';
import withHostStreaming from './hoc/withHostLiveStreaming';
import AudienceView from './components/AudienceView';
import { refChatList } from './components/ChatList';
import { defaultStyle } from './constants/defaultStyle';
import BroadCasterView from './components/BroadCasterView';
import ButtonHost from './components/ButtonHost';
import HeaderHost from './components/HeaderHost';
import CardDashboard from './components/CardDashboard';
import { LiveHeader } from './components/LiveHeader';
import { colors } from './constants/colors';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from './constants/spacing';
import { alertOk, alertYesNo } from './utils/alert';
import { hocDtos, LiveStreamState } from './hoc/dtos';

export interface RNAudienceStreamingProps {
    onCloseStream: () => void;
    onReceiveGift: (gift: any) => void;
    giftData: IGiftItem[];
    rightIconComposer?: string | number;
    configLiveStream: {
        appId: string;
        channelName: string;
    };
    _userInfoSocketChat: {
        user_name: string;
        user_id: string | number | any;
        chanel_id: string;
    };
}
const RNAudienceStreaming = withAudienceStreaming(
    (props: RNAudienceStreamingProps & hocDtos & LiveStreamState) => {
        const {
            rightIconComposer,
            onCloseStream,
            onReceiveGift,
            giftData,
            configLiveStream: { appId, channelName },
            _userInfoSocketChat,
        } = props;

        const initial = async () => {
            await props.init(appId);
            setTimeout(() => {
                props.startCall(channelName);
            }, 2000);
        };

        useEffect(() => {
            initial();
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
            enabled:
                props.connectionState === ConnectionStateType.Connected &&
                Boolean(props.peerIds.length),
            _userInfo: _userInfoSocketChat,
            onReceiveGift,
        });

        return (
            <View style={defaultStyle.container}>
                <AudienceView
                    onClose={onClose}
                    connection={props.connectionState}
                    concurrent={concurrent}
                    peerIds={props.peerIds}
                    channelName={channelName}
                />
                {props.connectionState === ConnectionStateType.Connected &&
                    Boolean(props.peerIds.length) && (
                        <>
                            <GiftFlag />
                            <SwipeList
                                dataMessage={messages}
                                onSend={onSend}
                                rightIconComposer={rightIconComposer}
                            />
                            <GiftListModal onDonate={handleDonate} data={giftData} />
                        </>
                    )}
            </View>
        );
    },
);

export interface RNBroadCasterStreamingProps {
    onBack: () => void;
    onCloseStream: () => void;
    onSelectGame: () => void;
    onPressAvatar: () => void;
    onReceiveGift: (gift: any) => void;
    configLiveStream: {
        appId: string;
        channelName: string;
    };
    _userInfoSocketChat: {
        user_name: string;
        user_id: string | number | any;
        chanel_id: string;
    };
    cardName?: string;
    imageUrl?: string;
    renderWaitingView?: () => JSX.Element;
    rightIconComposer?: any;
    uid: string | number;
    channelLive: string;
}

let timeout;
const RNBroadCasterStreaming = withHostStreaming(
    (props: RNBroadCasterStreamingProps & hocDtos & LiveStreamState) => {
        const {
            configLiveStream: { appId, channelName },
            _userInfoSocketChat,
            onReceiveGift,
            onSelectGame,
            onPressAvatar,
            cardName,
            imageUrl,
            renderWaitingView,
            rightIconComposer,
            uid,
            onBack,
            channelLive,
        } = props;

        const [countDown, setCountDown] = useState(3);

        const initial = () => {
            setTimeout(() => {
                props.init(appId);
            }, 100);
        };

        useEffect(() => {
            initial();
        }, []);

        useEffect(() => {
            if (props.joinSucceed) {
                timeout = setTimeout(() => {
                    if (countDown === 0) {
                        clearTimeout(timeout);
                        return;
                    }
                    setCountDown(c => c - 1);
                }, 1000);
            } else {
                setCountDown(3);
            }

            return () => {
                clearTimeout(timeout);
            };
        }, [props.joinSucceed, countDown]);

        const onPressCamera = () => props.switchCamera();
        const onPressHelp = () => alertOk({ msg: 'onPressHelp' });
        const onPressShare = () => alertOk({ msg: 'onPressShare' });

        const onLiveNow = () => {
            props.startCall(channelName, uid);
        };

        const onPressEndLive = () => {
            alertYesNo({
                msg: 'Are you sure to end live?',
                onPressAccept: () => props.endCall(),
            });
        };

        const { send, messages, concurrent } = useWebSockets({
            enabled: true,
            _userInfo: _userInfoSocketChat,
            onReceiveGift,
        });

        const onSend = ({ text }) => {
            if (!text) return;
            send({ message: text });
            refComposer.current?.reset();
        };

        return (
            <View style={defaultStyle.container}>
                <BroadCasterView
                    joinSucceed={props.joinSucceed}
                    renderWaitingView={renderWaitingView}
                    channelName={channelName}
                />
                {props.joinSucceed ? (
                    countDown === 0 ? (
                        <>
                            <LiveHeader
                                onPressEndLive={onPressEndLive}
                                onPressCamera={onPressCamera}
                                concurrent={concurrent}
                                joinSucceed={props.joinSucceed}
                            />
                            <GiftFlag />
                            <SwipeList
                                dataMessage={messages}
                                onSend={onSend}
                                rightIconComposer={rightIconComposer}
                            />
                        </>
                    ) : (
                        <View style={styles.wrapCountDown}>
                            <Text style={styles.countDown}>{countDown}</Text>
                        </View>
                    )
                ) : (
                    <>
                        <HeaderHost
                            onBack={onBack}
                            rightComponent={[
                                {
                                    icon: 'share-social-outline',
                                    onPress: onPressShare,
                                },
                                {
                                    icon: 'help-circle-outline',
                                    onPress: onPressHelp,
                                },
                            ]}
                        />
                        <View style={styles.body}>
                            <CardDashboard
                                channelLive={channelLive}
                                onSelectGame={onSelectGame}
                                nameGame={cardName}
                                url={
                                    imageUrl ||
                                    'https://cdn.pixabay.com/photo/2021/11/10/18/09/casino-6784520_960_720.jpg'
                                }
                            />
                            <ButtonHost name={'Live Now'} onPress={onLiveNow} />
                        </View>
                    </>
                )}
            </View>
        );
    },
);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 999,
    },
    countDown: {
        ...defaultStyle.heading3,
        color: colors.WHITE,
        textAlign: 'center',
    },
    wrapCountDown: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLACK_30,
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        position: 'absolute',
    },
});

export {
    withAudienceStreaming,
    withHostStreaming,
    SwipeList,
    GiftFlag,
    useWebSockets,
    AudienceView,
    refChatList,
    refComposer,
    refGiftFlag,
    GiftListModal,
    RNAudienceStreaming,
    RNBroadCasterStreaming,
};
