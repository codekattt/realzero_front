import Head from 'next/head';
import RealZeroPage from './main';

export default function Home() {
  return (
    <>
      <Head>
        <title>리얼제로</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="리얼제로 AI영양성분 분석" />
        <meta
          property="og:description"
          content="이건 진짜 제로일까? AI 성분분석으로 알아보세요."
        />
        <meta property="og:image" content="img/realzero_opengraph.png" />
        <meta property="og:url" content="https://realzero.netlify.app" />
        <meta property="og:type" content="website" />
      </Head>
      <RealZeroPage />
    </>
  );
}
