import React from 'react';
import { IGiftItem } from '../dtos';
export interface IGiftListModal {
    data: IGiftItem[];
    onDonate: (giftItem: IGiftItem) => void;
}
export declare const refGiftModal: React.RefObject<{
    open: () => void;
    close: () => void;
}>;
declare const _default: React.NamedExoticComponent<IGiftListModal>;
export default _default;
