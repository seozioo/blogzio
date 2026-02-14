export type PostArticleLinkProps = Readonly<{
    title: string;
    summary: string;
    postedAt: string;
    tags?: string[];
}>

export const PostArticleLink = (props: PostArticleLinkProps) => {
  return (
    <div>
        <p>{props.title}</p>
        <p>{props.summary}</p>
        <p>{props.postedAt}</p>
        <div>
          {props.tags?.map((tag) => (
            <span key={tag}>{`#${tag}`}</span>
          ))}
        </div>
    </div>
  )
}
