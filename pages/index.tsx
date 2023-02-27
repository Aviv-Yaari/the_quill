import Filters, { FilterProps } from "@/components/Filters";
import PostList from "@/components/PostList";
import Post from "@/types/Post";
import { readMultipleValuesFromQuery, readSingleValueFromQuery } from "@/utils/general_utils";
import { getPostsFromDB } from "@/services/post.service";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getTagsFromDB } from "@/services/tag.service";
import { TagLabelAndValue } from "@/types/Tag";
import { useRouter } from "next/router";
import { GridLayout } from "@/styles/helpers";

interface Props {
  posts: Post[];
  allTags: TagLabelAndValue[];
  selectedTags: TagLabelAndValue[];
  keywords: string;
}

export default function Home({ posts, allTags, selectedTags, keywords }: Props) {
  const router = useRouter();

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
        <Filters selectedTags={selectedTags} allTags={allTags} onFilter={handleFilter} defaultKeywords={keywords} />
        {posts && <PostList posts={posts} />}
      </GridLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const tags = readMultipleValuesFromQuery(context.query, 'tags');
  const keywords = readSingleValueFromQuery(context.query, 'keywords') || null;

  const [posts, allTags] = await Promise.all([getPostsFromDB({ tags, keywords }), getTagsFromDB()]);  

  const selectedTags = tags?.reduce((result: TagLabelAndValue[], tag) => {
    const tagDetails = allTags.find(t => t.label === tag);
    if (tagDetails) {
      result.push({ label: tagDetails.label, value: tagDetails.value });
    }
    return result;
  }, []) || null;  
  
  return { props: { posts, allTags, selectedTags, keywords } };
};

