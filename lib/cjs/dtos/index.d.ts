export interface IGiftItem {
    created_at?: string;
    created_by_id?: number;
    updated_at?: string;
    deleted_at?: null;
    deleted_by_id?: null;
    is_deleted?: number;
    id?: number;
    name?: string;
    description?: string;
    gift_type?: 'Gif' | 'Lottie';
    resource?: string;
    price?: number;
    coin?: number;
    thumbnail?: string;
    currency_id?: number;
    quantity_remain?: number;
}
export interface IReceiveGiftItem {
    chanel_id?: string;
    quantity?: number;
    user_name?: string;
    gift_data?: IGiftItem;
    queue_id?: string;
}
export interface IUserInfoSocketChat {
    user_name: string;
    user_id: string | number | any;
    channel_id: string;
}
