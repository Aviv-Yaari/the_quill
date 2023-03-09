import Filters, { FilterProps } from "@/components/Filters";
import PostList from "@/components/PostList";
import Post from "@/types/Post";
import { readMultipleValuesFromQuery, readSingleValueFromQuery } from "@/utils/general_utils";
import { getPostsFromDB } from "@/services/post.service";
import { getTagsFromDB } from "@/services/tag.service";
import { TagLabelAndValue } from "@/types/Tag";
import { useRouter } from "next/router";
import { GridLayout } from "@/styles/helpers";
import { useAppSelector } from "@/store";
import { selectIsLoadingRoute } from "@/store/slices/app.slice";
import Loader from "@/components/shared/Loader";
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
}

export default function Home({ posts: postsFromProps, allTags, selectedTags, keywords }: Props) {
  const router = useRouter();
  const isLoading = useAppSelector(selectIsLoadingRoute);
  const posts = useAppSelector(selectPostsData);
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(updatePosts(postsFromProps));
  }, [dispatch, postsFromProps]);

  const handleFilter: FilterProps['onFilter'] = ({ tags = [], keywords }) => {
    const tagsQuery = tags ? `tags=${[...tags].join(',')}` : '';
    const keywordsQuery = keywords ? `keywords=${keywords}` : '';
    router.push('/?' + [tagsQuery, keywordsQuery].join('&'));
  };
  
  return (
    <>
      <Head><title>The Quill</title></Head>
      <GridLayout>
        <Filters selectedTags={selectedTags} allTags={allTags} onFilter={handleFilter} defaultKeywords={keywords} />
        {!isLoading && posts && <PostList posts={posts} selectedTags={selectedTags.map(tag => tag.label)} />}
        {isLoading && <Loader />}
      </GridLayout>
    </>
  );
}

export const getServerSideProps = requireAuthForGetServerSideProps(
  async (context: GetServerSidePropsContext, user?: UserToken) => {   
    const tags = readMultipleValuesFromQuery(context.query, 'tags');
    const keywords = readSingleValueFromQuery(context.query, 'keywords') || null;
    const [posts, allTags] = await Promise.all([getPostsFromDB(user?.id, { tags, keywords }), getTagsFromDB()]);  

    const selectedTags = tags.reduce((result: TagLabelAndValue[], tag) => {
      const tagDetails = allTags.find(t => t.label === tag);
      if (tagDetails) {
        result.push({ label: tagDetails.label, value: tagDetails.value });
      }
      return result;
    }, []);
  
    return { props: { posts, allTags, selectedTags, keywords } };
  });

