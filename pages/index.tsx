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
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  posts: Post[];
  allTags: TagLabelAndValue[];
}

export default function Home({ posts: postsFromProps, allTags }: Props) {
  const [posts, setPosts] = useState(postsFromProps);
  const router = useRouter();
  const tagsFromUrl = useMemo(() => readMultipleValuesFromQuery(router.query, 'tags') || [], [router.query]);

  useEffect(() => {
    axios.get('/api/post', { params: { tags: tagsFromUrl?.join(',') } }).then(res => setPosts(res.data));
  }, [tagsFromUrl]);

  const handleFilter: FilterProps['onFilter'] = ({ tags }) => {
    if (!tags?.length) {
      return router.push('/');
    }    
    router.push(`/?tags=${[...tags].join(',')}`);
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
        {<Filters defaultTags={tagsFromUrl.map(tag => ({ label: tag, value: tag }))} allTags={allTags} onFilter={handleFilter} />}
      </GridLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const tags = readMultipleValuesFromQuery(context.query, 'tags');
  const [posts, allTags] = await Promise.all([getPostsFromDB({ tags }), getTagsFromDB()]);    
  return { props: { posts, allTags } };
};

