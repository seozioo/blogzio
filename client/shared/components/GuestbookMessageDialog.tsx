import { set, SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../hooks/use-api';
import { RefObject, useEffect, useState } from 'react';
import { GuestbookCanvas } from './GuestbookCanvas';
import { Dialog, Radio, RadioGroup } from '@base-ui/react';
import { Button } from './Button';
import {
  GuestbookMessageBgColor,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';
import { GuestbookBgSelector } from './GuestbookBgSelector';

type Inputs = {
  content: string;
  backgroundColor: GuestbookMessageBgColor;
};

export type GuestbookMessageDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: VoidFunction;
}>;

export const GuestbookMessageDialog = (props: GuestbookMessageDialogProps) => {
  const [isImage, setIsImage] = useState(false);

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
    },
  });

  useEffect(() => {
    if (props.open) {
      setIsImage(false);
      reset();

      // TODO: 캔버스 초기화 함수로 GuestbookCanvas에서 처리해야 함.
      canvas?.current?.getContext('2d')?.clearRect(0, 0, 300, 300);
    }
  }, [props.open, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isImage && canvas) {
      const canvasElement = canvas.current;
      if (canvasElement) {
        canvasElement.toBlob(async (blob) => {
          if (blob) {
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

            await apiClient.POST('/guestbook', {
              body: {
                nickname: '익명',
                password: '1234',
                contentType: 'IMAGE',
                content: imageUrl,
                backgroundColor: data.backgroundColor,
              },
            });
            props.onSubmit?.();
            props.onOpenChange(false);
          }
        });
      }

      return;
    }

    await apiClient.POST('/guestbook', {
      body: {
        nickname: '익명',
        password: '1234',
        contentType: 'TEXT',
        content: data.content,
        backgroundColor: data.backgroundColor,
      },
    });
    props.onSubmit?.();
    props.onOpenChange(false);
  };

  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 py-6 transition-all data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
            <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              방명록 쓰기
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-sm text-zinc-400">
              IP 주소은 익명으로 저장됩니다. (아직 아님)
            </Dialog.Description>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <input
                  title="그림으로"
                  name="isImage"
                  type="checkbox"
                  checked={isImage}
                  onChange={(e) => setIsImage(e.target.checked)}
                />
                <GuestbookBgSelector
                  defaultValue={'PINK' as GuestbookMessageBgColor}
                  onValueChange={(value) => setValue('backgroundColor', value)}
                />
              </div>
              {isImage ? (
                <GuestbookCanvas
                  backgroundColor={watch('backgroundColor')}
                  onChange={setCanvas}
                />
              ) : (
                <textarea
                  placeholder="방명록을 남겨주세요!"
                  className={guestbookMessageBgColorVariants({
                    className:
                      'w-75 h-75 resize-none rounded-2xl border border-gray-300 p-5 outline-none focus:ring-2 focus:ring-sky-400/50 transition-colors',
                    backgroundColor: watch('backgroundColor') ?? 'WHITE',
                  })}
                  {...register('content', { required: true })}
                />
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
