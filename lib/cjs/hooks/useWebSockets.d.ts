import { IGiftItem, IUserInfoSocketChat } from '../dtos';
declare type Props = {
    _userInfo: IUserInfoSocketChat;
    enabled: boolean;
    onConnected?: () => void;
    onReceiveGift?: (gift: any) => void;
};
declare type Message = {
    content: string;
    senderId: string;
    userId: string;
    date: Date;
};
export declare const useWebSockets: ({ enabled, onConnected, onReceiveGift, _userInfo }: Props) => {
    send: ({ message }: {
        message: any;
    }) => void;
    messages: Message[];
    concurrent: number;
    refSocket: any;
    send_gift: (giftData: IGiftItem) => void;
    leave_room: () => void;
};
export {};
