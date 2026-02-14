import clsx from "clsx"

export type BaseContainerProps = Readonly<{
    children: React.ReactNode
    className?: string
}>

export const BaseContainer = (props: BaseContainerProps) => {
  return (
    <div className={clsx("max-lg:container lg:w-5xl mx-auto px-4", props.className)}>{props.children}</div>
  )
}
