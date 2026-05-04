'use client'

import { Button } from '@/shared/components/Button';
import { ChangeEventHandler, SubmitEventHandler, useEffect, useState } from 'react';
import { BaseDialog } from './BaseDialog';
import { apiClient } from '@/constants/api-client';
import { components } from '@/types/schema';
import { ImageIcon, XCircleIcon } from '@phosphor-icons/react';
import { useAuth } from '../hooks/use-auth';


export const Profile = () => {
    const { token } = useAuth();
    const [preview, setPreview] = useState<string>();
    const [profiledata, setProfiledata] = useState<components["schemas"]["UserProfileResponse"]>();
    const [open, setOpen] = useState(true);


    useEffect(() => {
        (async () => {
            const { data } = token ? (await apiClient.GET('/user/profile')) : (await apiClient.GET('/user/profileview'));
            setProfiledata(data);
            setPreview(data?.profileImageUrl);
        })();
    }, [token]);

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
            open={open}
            onOpenChange={setOpen}
        >
            {token ? (
                <form onSubmit={handleSubmit}
                    className='flex flex-col items-center rounded-2xl gap-[16px] w-[300px] min-h-[356px] '>

                    <label className='group relative block overflow-hidden w-[200px] h-[200px] bg-zinc-200 rounded-2xl'>

                        {preview && (
                            <img
                                src={preview}
                                alt=""
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                        )
                        }

                        <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity'>
                            <ImageIcon size={32} weight="bold" className='text-white' />
                        </div>

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
                    <div className='w-full flex justify-end gap-[10px]'>
                        <Button type='button' variant='outline' onClick={() => setOpen(false)}>취소</Button>
                        <Button type='submit'>확인</Button>
                    </div>
                </form>
            ) : (
                <div className='flex flex-col items-center rounded-2xl gap-[16px] w-[300px] min-h-[356px]'>

                    <label className='group relative block overflow-hidden w-[200px] h-[200px] bg-zinc-200 rounded-2xl'>

                        <img
                            src={preview}
                            alt=""
                            className='absolute inset-0 w-full h-full object-cover'
                        />

                    </label>

                    <p className='w-full h-9 px-[10px] flex items-center justify-center font-bold'>{profiledata?.nickname}</p>
                    <p className='w-full h-9 px-[10px] flex items-center justify-center'>{profiledata?.bio}</p>
                    <div className='w-full flex justify-center focus:outline-none '>
                        <XCircleIcon size={32} weight="bold" onClick={() => setOpen(false)} className='text-sky-500 transition-colors  hover:text-sky-300 cursor-pointer' />
                    </div>
                </div>
            )}

        </BaseDialog>
    );
}