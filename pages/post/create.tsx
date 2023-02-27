import BackButton from "@/components/shared/BackButton";
import { TagLabelAndValue } from "@/types/Tag";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import TagSelect from "@/components/shared/TagSelect";
import { useRouter } from "next/router";
import { getTagsFromDB } from "@/services/tag.service";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Toast from "@/components/shared/Toast";
import { GridLayout } from "@/styles/helpers";

interface Props {
  allTags: TagLabelAndValue[];
}

export default function CreatePost({ allTags }: Props) {
  const [selectedTags, setSelectedTags] = useState<TagLabelAndValue[]>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(); // TODO: Use redux
  const [isLoading, setIsLoading] = useState(false);

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
      setError("Apologies! An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GridLayout>
      {error && <Toast onClose={() => setError(null)}>{error}</Toast>}
      <BackButton />
      <div>
        <h2>Create a Post</h2>
        <StyledForm onSubmit={handleSubmit}>
          <Title>
            <label htmlFor="post_title">Title:</label>
            <input type="text" id="post_title" name="title" placeholder="Enter some nice title"/>
          </Title>
          <Title>
            <label htmlFor="post_subtitle">Subtitle:</label>
            <input type="text" id="post_subtitle" name="subtitle" placeholder="A short summary"/>
          </Title>
          {allTags && (
            <Title>
              <label htmlFor="">Tags:</label>
              <TagSelect 
                options={allTags} 
                onChange={(selected) => setSelectedTags([...selected])}
              />
            </Title>)}
          <Title>
            <label htmlFor="post_body">Body:</label>
            <textarea name="body" id="post_body" cols={30} rows={10} placeholder="Your post goes here"></textarea>
          </Title>
          <PrimaryButton isBusy={isLoading}>Submit</PrimaryButton>
        </StyledForm>
      </div>
    </GridLayout>
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

export const getServerSideProps = async () => {    
  const allTags = await getTagsFromDB();
  return { props: { allTags } };
};

