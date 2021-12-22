import React from 'react';
import { IReceiveGiftItem } from '../dtos';
interface Props {
    data: any[];
    onSend?: ({ text }: {
        text: string;
    }) => void;
    rightIconComposer?: any;
    currentUserId: any;
}
export declare const refChatList: React.RefObject<{
    startAnimation: (receiveGift: IReceiveGiftItem) => void;
}>;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
