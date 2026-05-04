import clsx from 'clsx';

export type BaseContainerProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>;

export const BaseContainer = (props: BaseContainerProps) => {
  return (
    <div className={clsx('w-full max-w-210 mx-auto', props.className)} style={props.style}>
      {props.children}
    </div>
  );
};
