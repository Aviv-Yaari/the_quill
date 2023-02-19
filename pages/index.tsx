import Filters from "@/components/Filters";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import Head from "next/head";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aviv Yaari</title>
        <meta name="description" content="Hello, my name is Aviv Yaari" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>The Quill</h1>
        <Navbar />
        <PostList />
        <Filters/>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-column-gap: 2em;
`;
