import { TagLabelAndValue } from "./Tag";

interface Post {
    _id: string;
    title: string;
    subtitle: string;
    author: string;
    body: string;
    timestamp: number;
    tags: TagLabelAndValue[];
    read_time: number;
    likes: number;
    comments: Comment[];
}

interface Comment {
    author: string;
    body: string;
    timestamp: number;
}

export default Post;
export { Comment };