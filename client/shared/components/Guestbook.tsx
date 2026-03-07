'use client';

import {useApi} from "../hooks/use-api";

export const Guestbook = () => {
    const {data, isLoading} = useApi('/guestbook')

    const getDateText = (date?: string) => {
        if (!date) return '알 수 없음';

        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }

    return (
        <div className="flex gap-5">
            {isLoading || data!.messages?.map(message => (
                <div className="flex p-5 bg-amber-50 shadow-sm rounded-2xl" key={message.id}>
                    <div className="w-[260px] max-h-[260px] overflow-hidden">
                        <div className="flex justify-between">
                            <p>{message.nickname}</p>
                            <p>{getDateText(message.createdAt)}</p>
                        </div>
                        <p>{message.content?.text as string}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
