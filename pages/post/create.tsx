import BackButton from "@/components/shared/BackButton";
import { TagLabelAndValue } from "@/types/Tag";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import TagSelect from "@/components/shared/TagSelect";
import { useRouter } from "next/router";

export default function CreatePost() {
  const [allTags, setAllTags] = useState<TagLabelAndValue[]>();
  const [selectedTags, setSelectedTags] = useState<TagLabelAndValue[]>();
  const router = useRouter();

  useEffect(() => { 
    axios.get('/api/tag').then(res => setAllTags(res.data));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const body = formData.get("body");
    const tagIDs = selectedTags?.map(tag => tag.value);
    const result = await axios.post("/api/post", { title, subtitle, body, tags: tagIDs });
    result.data?.id && router.push('/post/' + result.data.id);
  };

  return (
    <>
      <BackButton />
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
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
        <button>Submit</button>
      </form>
    </>
  );
};

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;