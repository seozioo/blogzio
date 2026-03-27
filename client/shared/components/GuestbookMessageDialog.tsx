import { SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../hooks/use-api';
import { RefObject, useEffect, useState } from 'react';
import { GuestbookCanvas } from './GuestbookCanvas';
import {
  GuestbookMessageBgColor,
  guestbookMessageBgColors,
} from '@/constants/guestbook-message-color';
import { GuestbookBgSelector } from './GuestbookBgSelector';
import { GuestbookTypeToggle } from './GuestbookTypeToggle';
import { BaseDialog } from './BaseDialog';
import { GuestbookTextForm } from './GuestbookTextForm';
import { GuestbookAuthorFields } from './GuestbookAuthorFields';

type Inputs = {
  nickname: string;
  password: string;
  content: string;
  contentType: 'TEXT' | 'IMAGE';
  backgroundColor: GuestbookMessageBgColor;
};

export type GuestbookMessageDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: VoidFunction;
}>;

export const GuestbookMessageDialog = (props: GuestbookMessageDialogProps) => {
  // TODO: ref를 부모로 넘겨 받는게 좋은 방법인지 잘 모르겠음. 후에 수정하겠음.
  const [canvas, setCanvas] = useState<RefObject<HTMLCanvasElement | null>>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      backgroundColor: 'PINK',
      contentType: 'TEXT',
    }
  });

  useEffect(() => {
    if (props.open) {
      reset();

      const randomColor =
        guestbookMessageBgColors[
          Math.floor(Math.random() * guestbookMessageBgColors.length)
        ] ?? 'PINK';
      setValue('backgroundColor', randomColor);

      // TODO: 캔버스 초기화 함수로 GuestbookCanvas에서 처리해야 함.
      canvas?.current?.getContext('2d')?.clearRect(0, 0, 300, 300);
    }
  }, [props.open, reset]);

  const postGuestbook = async (
    data: Inputs,
    contentType: 'TEXT' | 'IMAGE',
    content: string,
  ) => {
    const { error } = await apiClient.POST('/guestbook', {
      body: {
        nickname: data.nickname,
        password: data.password,
        contentType,
        content,
        backgroundColor: data.backgroundColor,
      },
    });

    if (error) {
      alert(error);
      return;
    }

    props.onSubmit?.();
    props.onOpenChange(false);
  };

  const canvasToBlob = (canvasElement: HTMLCanvasElement) =>
    new Promise<Blob | null>((resolve) => {
      canvasElement.toBlob(resolve);
    });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (watch('contentType') === 'IMAGE' && canvas?.current) {
      const canvasElement = canvas.current;
      const blob = await canvasToBlob(canvasElement);

      if (!blob) {
        console.error('이미지 업로드 실패');
        return;
      }

      const response = await apiClient.POST('/asset', {
        body: { file: '' },
        bodySerializer: (_) => {
          const formData = new FormData();
          formData.append('file', blob);
          return formData;
        },
      });

      const imageUrl = response.data?.url;

      if (!imageUrl) {
        console.error('이미지 업로드 실패');
        return;
      }

      await postGuestbook(data, 'IMAGE', imageUrl);

      return;
    }

    await postGuestbook(data, 'TEXT', data.content);
  };

  return (
    <BaseDialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      title="방명록 쓰기"
      description="IP 주소은 익명으로 저장됩니다. (아직 아님)"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <GuestbookTypeToggle
              value={watch('contentType')}
              onValueChange={(value) => setValue('contentType', value)}
            />
            <GuestbookBgSelector
              value={watch('backgroundColor')}
              onValueChange={(value) => setValue('backgroundColor', value)}
            />
          </div>
          {watch('contentType') === 'IMAGE' ? (
            <GuestbookCanvas
              backgroundColor={watch('backgroundColor')}
              onChange={setCanvas}
            >
              <GuestbookAuthorFields
                nicknameInputProps={register('nickname', { required: true })}
                passwordInputProps={register('password', { required: true })}
              />
            </GuestbookCanvas>
          ) : (
            <GuestbookTextForm
              backgroundColor={watch('backgroundColor')}
              value={watch('content')}
              onChange={(value) => setValue('content', value)}
            >
              <GuestbookAuthorFields
                nicknameInputProps={register('nickname', { required: true })}
                passwordInputProps={register('password', { required: true })}
              />
            </GuestbookTextForm>
          )}
        </div>
        <BaseDialog.Actions>
          <BaseDialog.Close>취소</BaseDialog.Close>
          <BaseDialog.Submit>등록</BaseDialog.Submit>
        </BaseDialog.Actions>
      </form>
    </BaseDialog>
  );
};
