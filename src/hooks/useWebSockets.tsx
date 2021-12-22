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

const SOCKET_URL = 'http://kt.thangovn.com:5000';

export const useWebSockets = ({ enabled, onConnected, onReceiveGift, _userInfo }: Props) => {
    const ref = useRef<any>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [concurrent, setConcurrent] = useState(0);

    const [userInfo, setUserInfo] = useState<IUserInfoSocketChat>(_userInfo);
    const send = ({ message }) => {
        ref.current.emit('send_message', {
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            chanel_id: userInfo.channel_id,
            message,
        });
    };

    const send_gift = (giftData: IGiftItem) => {
        ref.current.emit('send_gift', {
            chanel_id: userInfo.channel_id,
            quantity: 99,
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            gift_data: giftData,
        });
    };

    const leave_room = () => {
        ref.current.emit('leave_room', {
            chanel_id: userInfo.channel_id,
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
        });
    };

    useEffect(() => {
        if (!enabled) {
            return;
        }
        const socket = io(SOCKET_URL, { transports: ['websocket'] });
        // console.log(socket, 'd');
        socket.emit('join_room', {
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            chanel_id: userInfo.channel_id,
        });

        socket.on('connect', () => {
            // console.warn('connect', socket, e);
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

        // send_gift
        // -> send_message -> emit
        // -> join_room -> emit

        // socket.on('reconnect', () => {
        //     socket.emit('joinRoom', userId);
        // });

        ref.current = socket;

        return () => {
            leave_room();
        };
    }, [enabled, userInfo]);

    return {
        send,
        messages,
        concurrent,
        refSocket: ref.current,
        send_gift,
        leave_room,
    };
};
