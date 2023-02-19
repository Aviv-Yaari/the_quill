import Post from "@/types/Post";
import styled from "styled-components";

interface Props {
    post: Post;
}

const PostPreview: React.FC<Props> = ({ post }) => {
  return (
    <Container>
      <h2>{post.title}</h2>
      <Subtitle>
        <Author>{post.author}</Author>
        <span>•</span>
        <Likes>{post.likes} ♥</Likes>
        <span>•</span>
        <ReadTime>{post.read_time} minutes</ReadTime>
        <span>•</span>
        <Tags>{post.tags.join(", ")}</Tags>
        <span>•</span>
        <CommentsCount>{post.comments.length} comments</CommentsCount>
      </Subtitle>
      <p>{post.body}</p>
    </Container>
  )
}

const Container = styled.article`
  padding-block: 2em;
  border-block-end: 1px solid ${({theme}) => theme.border.primary};
`

const Subtitle = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-block-end: 1em;
`

const Author = styled.span`
  
`

const Likes = styled.span`
  
`
const ReadTime = styled.span`
  
`
const Tags = styled.span`
  
`

const CommentsCount = styled.span`

`

export default PostPreview;