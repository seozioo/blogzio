import clsx from "clsx"

export type BaseContainerProps = Readonly<{
    children: React.ReactNode
    className?: string
}>

export const BaseContainer = (props: BaseContainerProps) => {
  return (
    <div className={clsx("max-w-210 mx-auto px-5", props.className)}>{props.children}</div>
  )
}
