import { Dialog } from '@base-ui/react';
import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';
import { Button } from './Button';

export type BaseDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  popupClassName?: string;
}>;

export type BaseDialogCloseProps = Readonly<{
  children?: ReactNode;
}>;

export type BaseDialogActionsProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export type BaseDialogSubmitProps = Readonly<{
  children?: ReactNode;
}>;

const BaseDialogRoot = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  popupClassName,
}: BaseDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal className="z-100">
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-zinc-900 opacity-20 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup
          className={clsx(
            'fixed top-1/2 left-1/2 -mt-8 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-5 py-6 transition-all data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
            popupClassName,
          )}
        >
          {title && (<Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            {title}
          </Dialog.Title>)}

          {description ? (
            <Dialog.Description className="mb-4 text-sm text-zinc-400">
              {description}
            </Dialog.Description>
          ) : null}
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const BaseDialogClose = ({ children }: BaseDialogCloseProps) => {
  return (
    <Dialog.Close render={<Button variant="outline" />}>
      {children ?? '취소'}
    </Dialog.Close>
  );
};

const BaseDialogActions = ({ children, className }: BaseDialogActionsProps) => {
  return (
    <div className={clsx('mt-4 flex justify-end gap-2', className)}>
      {children}
    </div>
  );
};

const BaseDialogSubmit = ({ children }: BaseDialogSubmitProps) => {
  return <Button type="submit">{children ?? '등록'}</Button>;
};

type BaseDialogComponent = ((props: BaseDialogProps) => ReactElement) & {
  Close: (props: BaseDialogCloseProps) => ReactElement;
  Actions: (props: BaseDialogActionsProps) => ReactElement;
  Submit: (props: BaseDialogSubmitProps) => ReactElement;
};

export const BaseDialog = Object.assign(BaseDialogRoot, {
  Close: BaseDialogClose,
  Actions: BaseDialogActions,
  Submit: BaseDialogSubmit,
}) as BaseDialogComponent;
