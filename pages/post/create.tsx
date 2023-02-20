import BackButton from "@/components/shared/BackButton";
import axios from "axios";
import { FormEventHandler, useRef } from "react";
import styled from "styled-components";

export default function CreatePost() {
  const title = useRef<HTMLInputElement>(null);
  const subtitle = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const response = await axios.post("/api/post", { title: title.current?.value, subtitle: subtitle.current?.value, body: body.current?.value });
  };

  return (
    <>
      <BackButton />
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <Title>
          <label htmlFor="post_title">Title:</label>
          <input ref={title} type="text" id="post_title" placeholder="Enter some nice title"/>
        </Title>
        <Title>
          <label htmlFor="post_subtitle">Subtitle:</label>
          <input ref={subtitle} type="text" id="post_subtitle" placeholder="A short summary"/>
        </Title>
        <Title>
          <label htmlFor="">Tags:</label>
          <input type="text" id="" />
        </Title>
        <Title>
          <label htmlFor="post_body">Body:</label>
          <textarea ref={body} name="body" id="post_body" cols={30} rows={10} placeholder="Your post goes here"></textarea>
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