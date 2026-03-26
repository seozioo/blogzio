import { SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../hooks/use-api';
import { RefObject, useEffect, useState } from 'react';
import { GuestbookCanvas } from './GuestbookCanvas';
import { Dialog, Radio, RadioGroup } from '@base-ui/react';
import { Button } from './Button';
import {
  GuestbookMessageBgColor,
  guestbookMessageBgColors,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';
import { GuestbookBgSelector } from './GuestbookBgSelector';
import { GuestbookTypeToggle } from './GuestbookTypeToggle';

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
    formState: { errors },
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
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-zinc-900 opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 py-6 transition-all data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
            <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              방명록 쓰기
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-sm text-zinc-400">
              IP 주소은 익명으로 저장됩니다. (아직 아님)
            </Dialog.Description>
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
                  <div className="flex gap-2 text-sm text-black/50">
                    <input
                      className="flex-2 w-full outline-none pointer-events-auto"
                      placeholder="닉네임"
                      {...register('nickname', { required: true })}
                    />
                    <input
                      className="flex-1 w-full outline-none pointer-events-auto"
                      type="password"
                      placeholder="비밀번호"
                      {...register('password', { required: true })}
                    />
                  </div>
                </GuestbookCanvas>
              ) : (
                <div
                  className={guestbookMessageBgColorVariants({
                    className:
                      'flex flex-col gap-2 w-75 h-75 rounded-2xl border border-gray-300 p-5 focus:ring-2 focus:ring-sky-400/50 transition-colors',
                    backgroundColor: watch('backgroundColor'),
                  })}
                >
                  <div className="flex gap-2 text-sm text-black/50">
                    <input
                      className="flex-2 w-full outline-none"
                      placeholder="닉네임"
                      {...register('nickname', { required: true })}
                    />
                    <input
                      className="flex-1 w-full outline-none"
                      type="password"
                      placeholder="비밀번호"
                      {...register('password', { required: true })}
                    />
                  </div>
                  <textarea
                    className="resize-none outline-none w-full h-full"
                    placeholder="방명록을 남겨주세요!"
                    {...register('content', { required: true })}
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Dialog.Close render={<Button variant="outline" />}>
                취소
              </Dialog.Close>
              <Button type="submit">등록</Button>
            </div>
          </Dialog.Popup>
        </form>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
