import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import getChatGPTResponse from '@/commons/api/openai';
import TypingEffect from '@/commons/styles/typingEffect';
import { ClipLoader } from 'react-spinners';
import * as S from './realzeroResult.styles';

function Results() {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { imageBase64 } = router.query;
  const isMounted = useRef(true);

  const moveToCaution = () => {
    router.push('/caution');
  };

  useEffect(() => {
    async function fetchData() {
      if (!router.query.inferText) return;
      setLoading(true);
      setError(null);
      try {
        // 인위적인 지연 추가
        await new Promise((resolve) => setTimeout(resolve, 30000));

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
            <S.ResultImage
              src={imageBase64}
              alt="Uploaded Image"
            ></S.ResultImage>
            <S.Result>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'gray', marginRight: '4px' }}>
                  AI 성분분석 중...
                </span>
                <ClipLoader size={18} color={'gray'} />
              </div>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: 'gray', marginRight: '4px' }}>
                    AI 성분분석 중...
                  </span>
                  <ClipLoader size={18} color={'gray'} />
                </div>
              ) : null}
              {error ? <div>{error}</div> : null}
              {resultData ? <TypingEffect text={resultData} /> : null}
            </S.Result>
          </S.ResultWrapper>
          <S.BottomCaution>
            ChatGPT를 이용한 분석 결과입니다. <br />
            분석 결과가 틀리거나 실제 영양성분과 다를 수 있으니
            <br />
            참고 용도로만 이용하시기 바랍니다!
          </S.BottomCaution>
          <S.BottomButtonWrapper>
            <S.BottomButton onClick={moveToCaution}>
              다시 분석하기
            </S.BottomButton>
          </S.BottomButtonWrapper>
        </S.Wrapper>
      </div>
    </>
  );
}

export default Results;
