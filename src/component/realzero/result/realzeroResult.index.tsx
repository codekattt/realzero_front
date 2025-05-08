import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import * as S from './realzeroResult.styles';

interface RouterQuery {
  imageBase64?: string;
}

const loadingMessages = [
  '이미지에서 텍스트를 추출하고 있어요..',
  '추출된 성분을 열심히 분석하고 있어요..',
  '제로식품인지 확인하고 있어요..',
  'AI가 답변을 준비하고 있어요..',
];

export default function RealZeroResults(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>(
    loadingMessages[0],
  );

  const router = useRouter();
  const { imageBase64 } = router.query as RouterQuery;
  const isMounted = useRef(true);

  const moveToCaution = (): void => {
    const userConfirmed = confirm('다시 분석하시겠습니까?');
    if (userConfirmed) {
      router.push('/caution');
    }
  };

  useEffect(() => {
    isMounted.current = true;

    async function fetchData(): Promise<void> {
      if (!imageBase64) return;
      setLoading(true);
      setError(null);
      try {
        const blob = await (await fetch(imageBase64)).blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post(
          'https://realzero-back.onrender.com/api/openai',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );

        const gptResponse = res.data.choices?.[0]?.message?.content;

        if (isMounted.current && gptResponse) {
          setResultData(gptResponse);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          console.error('데이터 로딩 중 오류가 발생했습니다:', error);
          setError(
            'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          );
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [imageBase64]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessage((prev) => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <S.Wrapper>
        <S.TopNavigation onClick={moveToCaution}> 〈 분석 결과</S.TopNavigation>
        <S.ResultWrapper>
          <S.RzH1>
            AI 분석 결과입니다.
            <br />
          </S.RzH1>
          <S.ResultImage src={imageBase64} alt="Uploaded Image"></S.ResultImage>
          <S.Result>
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'gray', marginRight: '4px' }}>
                  {loadingMessage}
                </span>
                <ClipLoader size={18} color={'gray'} />
              </div>
            )}

            {error && <div>{error}</div>}
            {resultData && <ReactMarkdown>{resultData}</ReactMarkdown>}
          </S.Result>
        </S.ResultWrapper>
        <S.BottomCaution>
          ChatGPT를 이용한 분석 결과입니다. <br />
          분석 결과가 틀리거나 실제 영양성분과 다를 수 있으니
          <br />
          참고 용도로만 이용하시기 바랍니다!
        </S.BottomCaution>
        <S.BottomButtonWrapper>
          <S.BottomButton onClick={moveToCaution}>다시 분석하기</S.BottomButton>
        </S.BottomButtonWrapper>
      </S.Wrapper>
    </div>
  );
}
