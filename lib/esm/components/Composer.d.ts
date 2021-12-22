import React from 'react';
interface Props {
    onSend: ({ text }: {
        text: string;
    }) => void;
    source?: string | number | any;
}
export declare const refComposer: React.RefObject<{
    reset: () => void;
}>;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
