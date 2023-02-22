import Filters from "@/components/Filters";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import Post from "@/types/Post";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    axios.get("/api/post").then(res => setPosts(res.data));
  }, []);

  return (
    <>
      <Head>
        <title>Aviv Yaari</title>
        <meta name="description" content="Hello, my name is Aviv Yaari" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridLayout>
        {posts && <PostList posts={posts} />}
        <Filters/>
      </GridLayout>
    </>
  );
}


