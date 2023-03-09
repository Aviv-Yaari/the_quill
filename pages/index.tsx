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
import { useAppSelector } from "@/store";
import { selectIsLoadingRoute } from "@/store/slices/app.slice";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectPostsData, updatePosts } from "@/store/slices/posts.slice";
import { authService } from "@/services/auth.service";
import cookie from 'cookie';
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
      <Head>
        <title>Aviv Yaari</title>
        <meta name="description" content="Hello, my name is Aviv Yaari" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridLayout>
        <Filters selectedTags={selectedTags} allTags={allTags} onFilter={handleFilter} defaultKeywords={keywords} />
        {!isLoading && posts && <PostList posts={posts} selectedTags={selectedTags.map(tag => tag.label)} />}
        {isLoading && <Loader />}
      </GridLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {    
  const tags = readMultipleValuesFromQuery(context.query, 'tags');
  const keywords = readSingleValueFromQuery(context.query, 'keywords') || null;
  const { token } = cookie.parse(context.req.headers.cookie || '');
  const loggedInUser = authService.verifyToken(token);
  const [posts, allTags] = await Promise.all([getPostsFromDB(loggedInUser?.id, { tags, keywords }), getTagsFromDB()]);  

  const selectedTags = tags.reduce((result: TagLabelAndValue[], tag) => {
    const tagDetails = allTags.find(t => t.label === tag);
    if (tagDetails) {
      result.push({ label: tagDetails.label, value: tagDetails.value });
    }
    return result;
  }, []);  
  
  return { props: { posts, allTags, selectedTags, keywords } };
};

