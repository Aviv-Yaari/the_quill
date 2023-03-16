import { TagLabelAndValue } from "@/types/Tag";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import TagSelect from "@/components/TagSelect";
import { useRouter } from "next/router";
import { getTagsFromDB } from "@/services/tag.service";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { GridLayout } from "@/styles/helpers";
import { useDispatch } from "react-redux";
import { raiseError } from "@/store/slices/app.slice";
import { requireAuthForGetServerSideProps } from "@/middleware/requireAuth";
import Head from "next/head";

interface Props {
  allTags: TagLabelAndValue[];
}

const CreatePostPage = ({ allTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<TagLabelAndValue[]>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    try {
      ev.preventDefault();
      setIsLoading(true);
      const formData = new FormData(ev.target as HTMLFormElement);
      const title = formData.get("title");
      const subtitle = formData.get("subtitle");
      const body = formData.get("body");
      
      const tagIDs = selectedTags?.map(tag => tag.value);
      const result = await axios.post("/api/post", { title, subtitle, body, tags: tagIDs });
      result.data?.id && router.push('/post/' + result.data.id);
    } catch (error) {
      dispatch(raiseError("Error while creating a post"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head><title>The Quill - Create a post</title></Head>
      <GridLayout>
        <div>
          <h2>Create a post</h2>
        </div>
        <StyledForm onSubmit={handleSubmit}>
          <Title>
            <label htmlFor="post_title">Title:</label>
            <input type="text" id="post_title" name="title" placeholder="Enter some nice title" minLength={5} maxLength={30} required />
          </Title>
          <Title>
            <label htmlFor="post_subtitle">Subtitle:</label>
            <input type="text" id="post_subtitle" name="subtitle" placeholder="A short summary" minLength={5} maxLength={30} required />
          </Title>
          {allTags && (
            <Title>
              <label htmlFor="">Tags:</label>
              <TagSelect options={allTags} onChange={(selected) => setSelectedTags([...selected])} />
            </Title>)}
          <Title>
            <label htmlFor="post_body">Body:</label>
            <textarea name="body" id="post_body" cols={30} rows={10} placeholder="Your post goes here" minLength={30} maxLength={300} required />
          </Title>
          <PrimaryButton isBusy={isLoading}>Submit</PrimaryButton>
        </StyledForm>
      </GridLayout>
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

export const getServerSideProps = requireAuthForGetServerSideProps(
  async () => {
    const allTags = await getTagsFromDB();
    return { props: { allTags } };
  },
  true
);

export default CreatePostPage;