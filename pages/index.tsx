import Filters, { FilterProps } from "@/components/Filters";
import PostList from "@/components/PostList";
import Post, { GetPostsFilters } from "@/types/Post";
import { readMultipleValuesFromQuery, readSingleValueFromQuery } from "@/utils/general_utils";
import { getPostsFromDB } from "@/services/post.service";
import { getTagsFromDB } from "@/services/tag.service";
import { TagLabelAndValue } from "@/types/Tag";
import { useRouter } from "next/router";
import { GridLayout } from "@/styles/helpers";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectPostsData, updatePosts } from "@/store/slices/posts.slice";
import { requireAuthForGetServerSideProps } from "@/middleware/requireAuth";
import { GetServerSidePropsContext } from "next";
import { UserToken } from "@/types/User";
import Head from "next/head";
interface Props {
  posts: Post[];
  allTags: TagLabelAndValue[];
  selectedTags: TagLabelAndValue[];
  keywords: string;
  category: GetPostsFilters['category'];
}

export default function Home({ posts: postsFromProps, allTags, selectedTags, keywords, category }: Props) {
  const router = useRouter();
  const posts = useAppSelector(selectPostsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePosts(postsFromProps));
  }, [dispatch, postsFromProps]);

  const handleFilter: FilterProps['onFilter'] = (query) => {
    router.push({ pathname: router.pathname, query: { ...router.query, ...query } });
  };
  
  return (
    <>
      <Head><title>The Quill</title></Head>
      <GridLayout>
        <Filters selectedTags={selectedTags} category={category} allTags={allTags} onFilter={handleFilter} defaultKeywords={keywords} />
        {posts && <PostList posts={posts} selectedTags={selectedTags.map(tag => tag.label)} />}
      </GridLayout>
    </>
  );
}

export const getServerSideProps = requireAuthForGetServerSideProps(
  async (context: GetServerSidePropsContext, user?: UserToken) => {   
    const tags = readMultipleValuesFromQuery(context.query, 'tags');
    const keywords = readSingleValueFromQuery(context.query, 'keywords') || null;
    const category = readSingleValueFromQuery(context.query, 'category') === 'most_recent' ? 'most_recent' : 'top_rated'; // the default is top_rated
    const [posts, allTags] = await Promise.all([getPostsFromDB(user?.id, { tags, keywords, category }), getTagsFromDB()]);  

    const selectedTags = tags.reduce((result: TagLabelAndValue[], tag) => {
      const tagDetails = allTags.find(t => t.label === tag);
      if (tagDetails) {
        result.push({ label: tagDetails.label, value: tagDetails.value });
      }
      return result;
    }, []);
  
    return { props: { posts, allTags, selectedTags, keywords, category } };
  });

