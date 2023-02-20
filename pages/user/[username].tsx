import PostList from "@/components/PostList";
import PostPreview from "@/components/PostPreview";
import Post from "@/types/Post";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>();
  const { username } = router.query;

  useEffect(() => {
    axios.get('/api/post').then(res => setPosts(res.data));
  }, []);

  return (
    <>
      <h2>{username}</h2>
      {posts?.map(post => <PostPreview key={post._id as string} post={post} />)}
    </>
  );
}