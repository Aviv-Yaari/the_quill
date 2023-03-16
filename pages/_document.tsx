import { Html, Main, NextScript, Head } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="The quill is an online blog community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}