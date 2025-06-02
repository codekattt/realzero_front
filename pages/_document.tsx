import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/img/realzero_favicon.png" />
        <meta property="og:title" content="리얼제로 AI영양성분 분석 서비스" />
        <meta
          property="og:description"
          content="이건 진짜 제로일까? AI 성분분석으로 알아보세요."
        />
        <meta property="og:image" content="/img/realzero_opengraph.png" />
        <meta property="og:url" content="https://realzero.netlify.app" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
