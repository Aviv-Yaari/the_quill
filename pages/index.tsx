import Filters, { FilterProps } from "@/components/Filters";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import Post from "@/types/Post";
import { readMultipleValuesFromQuery } from "@/utils/general_utils";
import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getTagsFromDB } from "@/services/tag.service";
import { TagLabelAndValue } from "@/types/Tag";
import { useState } from "react";
import axios from "axios";

interface Props {
  posts: Post[];
  allTags: TagLabelAndValue[];
}

export default function Home({ posts: postsFromProps, allTags }: Props) {
  const [posts, setPosts] = useState(postsFromProps);

  const handleFilter: FilterProps['onFilter'] = async ({ tags }) => {
    const result = await axios.get('/api/post', { params: { tags: tags.join(',') } });
    const filteredPosts = result.data;
    setPosts(filteredPosts);
  };
  
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
        <Filters allTags={allTags} onFilter={handleFilter} />
      </GridLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const tags = readMultipleValuesFromQuery(context.query, 'tags');
  const [posts, allTags] = await Promise.all([getPostsFromDB({ tags }), getTagsFromDB()]);    
  return { props: { posts, allTags } };
};

