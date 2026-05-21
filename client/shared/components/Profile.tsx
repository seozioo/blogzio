'use client';

import { Button } from '@/shared/components/Button';
import {
  ChangeEventHandler,
  SubmitEventHandler,
  useEffect,
  useState,
} from 'react';
import { BaseDialog } from './BaseDialog';
import { apiClient } from '@/constants/api-client';
import { components } from '@/types/schema';
import { ImageIcon, TrashIcon, XCircleIcon } from '@phosphor-icons/react';
import { useAuth } from '../hooks/use-auth';
import { uploadImage } from '../utils/upload-image';

export type ProfileProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

export const Profile = ({ open, onOpenChange }: ProfileProps) => {
  const { token } = useAuth();
  const [preview, setPreview] = useState<string>();
  const [profiledata, setProfiledata] =
    useState<components['schemas']['UserProfileResponse']>();

  useEffect(() => {
    (async () => {
      const { data } = await apiClient.GET('/user/profileview');
      setProfiledata(data);
      setPreview(data?.profileImageUrl);
    })();
  }, [token]);

  const handleFileChange: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = async (event) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    const data = await uploadImage(file);

    if (data) {
      setProfiledata({ ...profiledata, profileImageUrl: data });
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!profiledata?.nickname) return;

    await apiClient.PUT('/user/profile', {
      body: {
        nickname: profiledata.nickname,
        bio: profiledata.bio,
        profileImageUrl: profiledata.profileImageUrl,
      },
    });
  };

  return (
    <BaseDialog open={open} onOpenChange={onOpenChange} popupClassName='rounded-none' >
      {token ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center rounded-2xl gap-[16px] w-[280px] min-h-[380px]"
        >
          <label className="group relative block overflow-hidden w-[280px] h-[280px] bg-zinc-200">
            {preview && (
              <img
                src={preview}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageIcon size={32} weight="bold" className="text-white" />
              {preview && (
                <TrashIcon
                  size={32}
                  weight="fill"
                  className="absolute top-2 left-2 text-white cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPreview(undefined);
                    setProfiledata({ ...profiledata, profileImageUrl: undefined });
                  }}
                />
              )}
            </div>

            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          <input
            value={profiledata?.nickname}
            onChange={(e) =>
              setProfiledata({ ...profiledata, nickname: e.target.value })
            }
            placeholder="닉네임"
            className="w-full h-[36] px-[10px] border border-border rounded-2xl"
          ></input>
          <input
            value={profiledata?.bio}
            onChange={(e) =>
              setProfiledata({ ...profiledata, bio: e.target.value })
            }
            placeholder="상태 메세지"
            className="w-full h-[36] px-[10px] border border-border rounded-2xl"
          ></input>
          <div className="w-full flex justify-end gap-[10px]">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit">확인</Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-6 items-center w-[280px] min-h-[380px]">
          <label className="group relative block overflow-hidden w-[280px] h-[280px] bg-zinc-200">
            <img
              src={preview}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity text-white">
              {profiledata?.nickname}
            </div>
          </label>
          <div className="flex w-full h-[76px] items-center justify-center">
            <p className="w-full px-[10px] flex items-center justify-center text-center">
              {profiledata?.bio}
            </p>
          </div>
        </div >
      )}
    </BaseDialog >

  );
};
