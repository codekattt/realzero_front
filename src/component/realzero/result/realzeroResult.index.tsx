import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import * as S from './realzeroResult.styles';

const loadingMessages = [
  '이미지에서 텍스트를 추출하고 있어요..',
  '추출된 성분을 열심히 분석하고 있어요..',
  '제로식품인지 확인하고 있어요..',
  'AI가 답변을 준비하고 있어요...',
];

export default function RealZeroResults() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  // 1) router 준비될 때 sessionStorage에서 꺼내기
  useEffect(() => {
    if (!router.isReady) return;
    const stored = sessionStorage.getItem('uploadedImage');
    if (!stored) {
      setError('이미지 정보를 찾을 수 없습니다.');
      return;
    }
    setImageBase64(stored);
  }, [router.isReady]);

  // 2) 본격 스트림 요청
  useEffect(() => {
    if (!imageBase64) return;

    const fetchStreamedData = async () => {
      setLoading(true);
      setError(null);
      setResultData('');

      try {
        const response = await fetch(
          'https://realzero-back.onrender.com/api/openai',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'text/event-stream', // SSE 수신 명시
            },
            body: JSON.stringify({ image_url: imageBase64 }),
          },
        );
        if (!response.body) throw new Error('응답 스트림이 비어 있음');

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          if (doneReading) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE는 '\n\n'으로 이벤트 구분
          const parts = buffer.split('\n\n');
          buffer = parts.pop()!;

          for (const part of parts) {
            if (!part.startsWith('data: ')) continue;
            const data = part.replace(/^data: /, '').trim();
            if (data === '[DONE]') {
              done = true;
              break;
            }
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              setResultData((prev) => prev + content);
            }
          }
        }
      } catch (err) {
        console.error('결과 출력 중 오류:', err);
        setError('AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchStreamedData();
  }, [imageBase64]);

  // 3) 로딩 메시지 순환
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMessage((prev) => {
        const idx = loadingMessages.indexOf(prev);
        return loadingMessages[(idx + 1) % loadingMessages.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [loading]);

  const moveToCaution = () => {
    if (confirm('다시 분석하시겠습니까?')) {
      router.push('/caution');
    }
  };

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
          {imageBase64 && (
            <S.ResultImage src={imageBase64} alt="Uploaded Image" />
          )}
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
