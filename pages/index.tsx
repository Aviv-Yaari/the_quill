import Filters, { FilterProps } from "@/components/Filters";
import PostList from "@/components/PostList";
import { GridLayout } from "@/styles/helpers";
import Post from "@/types/Post";
import { readMultipleValuesFromQuery, readSingleValueFromQuery } from "@/utils/general_utils";
import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getTagsFromDB } from "@/services/tag.service";
import { TagLabelAndValue } from "@/types/Tag";
import { useMemo } from "react";
import { useRouter } from "next/router";

interface Props {
  posts: Post[];
  allTags: TagLabelAndValue[];
}

export default function Home({ posts, allTags }: Props) {
  const router = useRouter();
  const tagsFromUrl = useMemo(() => readMultipleValuesFromQuery(router.query, 'tags'), [router.query]);
  const keywordsFromUrl = useMemo(() => readSingleValueFromQuery(router.query, 'keywords'), [router.query]);

  const handleFilter: FilterProps['onFilter'] = ({ tags = [], keywords }) => {
    const tagsQuery = tags ? `tags=${[...tags].join(',')}` : '';
    const keywordsQuery = keywords ? `keywords=${keywords}` : '';
    router.push('/?' + [tagsQuery, keywordsQuery].join('&'));
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
        {<Filters selectedTags={tagsFromUrl?.map(tag => ({ label: tag, value: tag }))} allTags={allTags} onFilter={handleFilter} />}
      </GridLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const tags = readMultipleValuesFromQuery(context.query, 'tags');
  const keywords = readSingleValueFromQuery(context.query, 'keywords');
  
  const [posts, allTags] = await Promise.all([getPostsFromDB({ tags, keywords }), getTagsFromDB()]);    
  return { props: { posts, allTags } };
};

