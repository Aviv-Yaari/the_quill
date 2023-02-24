import Filters from "@/components/Filters";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import Post from "@/types/Post";
import { getPostsFromDB } from "@/utils/post_utils";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
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

export const getServerSideProps: GetServerSideProps = async () => {    
  const posts = await getPostsFromDB();
  return { props: { posts } };
};

