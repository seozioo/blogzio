'use client'

import { Button } from '@/shared/components/Button';
import { ChangeEventHandler, SubmitEventHandler, useEffect, useState } from 'react';
import { BaseDialog } from './BaseDialog';
import { apiClient } from '@/constants/api-client';
import { components } from '@/types/schema';


export const Profile = () => {
    const [preview, setPreview] = useState<string>();
    const [profiledata, setProfiledata] = useState<components["schemas"]["UserProfileResponse"]>();

    useEffect(() => {
        (async () => {
            const { data } = await apiClient.GET('/user/profile');
            setProfiledata(data);
            setPreview(data?.profileImageUrl);
        })();
    }, []);

    const handleFileChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
        const file = event.currentTarget.files?.[0];

        console.log(file?.name)

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!profiledata?.nickname) return;

        await apiClient.PUT('/user/profile', {
            body: {
                nickname: profiledata.nickname,
                bio: profiledata.bio,
                profileImageUrl: profiledata.profileImageUrl,
            }
        });
    }


    return (
        <BaseDialog
            open={true}
            onOpenChange={() => { }}
        >
            <form onSubmit={handleSubmit}
                className='flex flex-col items-center rounded-2xl gap-[16px] w-[300px] min-h-[356px] '>

                <label className='w-[200px] h-[200px] bg-zinc-200 rounded-2xl'>

                    <div className='group-hover:opacity-25 transition-opacity'>

                    </div>
                    <img
                        src={preview}
                        alt=""
                        className=''
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                <input value={profiledata?.nickname}
                    onChange={(e) => setProfiledata({ ...profiledata, nickname: e.target.value })}
                    placeholder='닉네임'
                    className='w-full h-[36] px-[10px] border border-border rounded-2xl'
                ></input>
                <input value={profiledata?.bio}
                    onChange={(e) => setProfiledata({ ...profiledata, bio: e.target.value })}
                    placeholder='상태 메세지'
                    className='w-full h-[36] px-[10px] border border-border rounded-2xl'
                ></input>
                <div className='flex justify-end'>
                    <Button type='button'>취소</Button>
                    <Button type='submit'>확인</Button>
                </div>
            </form>
        </BaseDialog>
    );
}