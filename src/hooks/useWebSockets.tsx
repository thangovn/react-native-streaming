import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { IGiftItem, IUserInfoSocketChat } from '../dtos';
import { ChanelConcurrent } from './webSocketDTO';

type Props = {
    _userInfo: IUserInfoSocketChat;
    enabled: boolean;
    onConnected?: () => void;
    onReceiveGift?: (gift: any) => void;
};

type Message = {
    content: string;
    senderId: string;
    userId: string;
    date: Date;
};

const SOCKET_URL = 'https://rt-staging.thangovn.com';

export const useWebSockets = ({ enabled, onConnected, onReceiveGift, _userInfo }: Props) => {
    const ref = useRef<any>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [concurrent, setConcurrent] = useState(0);

    const send = ({ message }) => {
        ref.current.emit('send_message', {
            user_name: _userInfo.user_name,
            user_id: _userInfo.user_id,
            chanel_id: _userInfo.channel_id,
            message,
        });
    };

    const send_gift = (giftData: IGiftItem) => {
        ref.current.emit('send_gift', {
            chanel_id: _userInfo.channel_id,
            quantity: 99,
            user_name: _userInfo.user_name,
            user_id: _userInfo.user_id,
            gift_data: giftData,
        });
    };

    const leave_room = () => {
        ref.current.emit('leave_room', {
            chanel_id: _userInfo.channel_id,
            user_name: _userInfo.user_name,
            user_id: _userInfo.user_id,
        });
    };

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const socket = io(SOCKET_URL, { transports: ['websocket'] });
        socket.emit('join_room', {
            user_name: _userInfo.user_name,
            user_id: _userInfo.user_id,
            chanel_id: _userInfo.channel_id,
        });

        socket.on('connect', () => {
            // console.warn('connect', socket);
            if (onConnected) {
                onConnected();
            }
        });

        socket.on('subscribe.chanel_messages', ({ chanel_id, messages }) => {
            // console.warn('chanel_messages', []);
            const a = messages.reverse();
            setMessages(a);
        });

        socket.on('subscribe.new_message', (new_message: any) => {
            // console.warn('new_message', new_message);
            setMessages(prev => [new_message, ...prev]);
        });

        socket.on('subscribe.receive_gift', (gift: any) => {
            // console.log('receive_gift', JSON.stringify(gift));
            onReceiveGift?.(gift);
        });

        socket.on('subscribe.chanel_concurrent', (chanel_concurrent: ChanelConcurrent) => {
            // console.warn('chanel_concurrent', chanel_concurrent);
            setConcurrent(chanel_concurrent.concurrent);
        });

        ref.current = socket;

        return () => {
            leave_room();
        };
    }, [enabled, _userInfo]);

    return {
        send,
        messages,
        concurrent,
        refSocket: ref.current,
        send_gift,
        leave_room,
    };
};
