/// <reference types="react" />
import { refComposer } from './components/Composer';
import GiftListModal from './components/GiftListModal';
import { useWebSockets } from './hooks/useWebSockets';
import GiftFlag, { refGiftFlag } from './components/GiftFlag';
import SwipeList from './components/SwipeList';
import withAudienceStreaming from './hoc/withAudienceStreaming';
import withHostStreaming from './hoc/withHostLiveStreaming';
import AudienceView from './components/AudienceView';
import { refChatList } from './components/ChatList';
import { IGiftItem, IUserInfoSocketChat } from './dtos';
export interface RNAudienceStreamingProps {
    onCloseStream: () => void;
    onReceiveGift: (gift: any) => void;
    giftData: IGiftItem[];
    rightIconComposer?: string | number;
    configLiveStream: {
        appId: string;
        channelName: string;
    };
    _userInfoSocketChat: IUserInfoSocketChat;
}
declare const RNAudienceStreaming: any;
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
    _userInfoSocketChat: IUserInfoSocketChat;
    cardName?: string;
    imageUrl?: string;
    renderWaitingView?: () => JSX.Element;
    rightIconComposer?: any;
    uid: string | number;
    channelLive: string;
}
declare const RNBroadCasterStreaming: any;
export { withAudienceStreaming, withHostStreaming, SwipeList, GiftFlag, useWebSockets, AudienceView, refChatList, refComposer, refGiftFlag, GiftListModal, RNAudienceStreaming, RNBroadCasterStreaming, };
