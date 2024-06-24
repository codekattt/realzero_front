import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import getChatGPTResponse from '@/commons/api/openai';
import TypingEffect from '@/commons/styles/typingEffect';
import * as S from './realzeroResult.styles';

function Results() {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가
  const router = useRouter();
  const isMounted = useRef(true);

  useEffect(() => {
    async function fetchData() {
      if (!router.query.inferText) return; // inferText 유효성 검사

      setLoading(true);
      setError(null); // 로딩 시작 전 에러 초기화
      try {
        const response = await getChatGPTResponse(router.query.inferText);
        if (isMounted.current) {
          setResultData(response);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          console.error('데이터 로딩 중 오류가 발생했습니다:', error);
          setError('일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <S.Wrapper>
          <S.TopNavigation> 〈 분석 결과</S.TopNavigation>
          <S.ResultWrapper>
            <S.RzH1>
              AI 분석 결과, 이 제품은
              <br />
              ‘ThisType’ 식품입니다.
            </S.RzH1>
            <S.Result>
              {loading ? <div>영양성분 분석중..!</div> : null}
              {error ? <div>{error}</div> : null}
              {resultData ? <TypingEffect text={resultData} /> : null}
            </S.Result>
          </S.ResultWrapper>
          <S.BottomButtonWrapper>
            <S.BottomButton>AI 영양성분 분석 시작하기</S.BottomButton>
          </S.BottomButtonWrapper>
        </S.Wrapper>
      </div>
    </>
  );
}

export default Results;
