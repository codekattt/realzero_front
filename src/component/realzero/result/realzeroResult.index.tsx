import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import * as S from './realzeroResult.styles';

const MAX_IMAGE_SIZE = 800;
const CACHE_KEY_PREFIX = 'realzero_result_';

const resizeImage = async (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > MAX_IMAGE_SIZE || height > MAX_IMAGE_SIZE) {
        if (width > height) {
          height = (height / width) * MAX_IMAGE_SIZE;
          width = MAX_IMAGE_SIZE;
        } else {
          width = (width / height) * MAX_IMAGE_SIZE;
          height = MAX_IMAGE_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
  });
};

export default function RealZeroResults() {
  const router = useRouter();
  const [base64, setBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const stored = sessionStorage.getItem('uploadedImageBase64');
    if (!stored) {
      setError('이미지 정보를 찾을 수 없습니다.');
      return;
    }
    setBase64(stored);
  }, [router.isReady]);

  useEffect(() => {
    if (!base64) return;

    const callApi = async () => {
      setLoading(true);
      setError(null);
      setResultData('');

      try {
        const cacheKey = CACHE_KEY_PREFIX + base64.slice(-50);
        const cachedResult = localStorage.getItem(cacheKey);

        if (cachedResult) {
          setResultData(cachedResult);
          setLoading(false);
          return;
        }

        const optimizedImage = await resizeImage(base64);
        const blob: Blob = await (await fetch(optimizedImage)).blob();
        const formData = new FormData();
        formData.append('file', blob, 'upload.jpg');

        const resp = await fetch(
          'https://realzero-back.onrender.com/api/openai',
          {
            method: 'POST',
            body: formData,
          },
        );

        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.error || '서버 오류');
        }

        const content = data.choices
          .map((c: any) => c.message?.content ?? '')
          .join('');

        localStorage.setItem(cacheKey, content);
        setResultData(content);
      } catch (err: any) {
        console.error('AI 분석 중 오류:', err);
        setError('AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    callApi();
  }, [base64]);

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
        <S.TopNavigation onClick={moveToCaution}>
          〈 이전 페이지
        </S.TopNavigation>
        <S.ResultWrapper>
          <S.RzH1>
            AI 분석 결과입니다.
            <br />
          </S.RzH1>
          {base64 && <S.ResultImage src={base64} alt="Uploaded Image" />}
          <S.Result>
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'gray', marginRight: 4 }}>
                  AI가 결과를 가져오는 중...
                </span>
                <ClipLoader size={18} color="gray" />
              </div>
            )}
            {error && <div>{error}</div>}
            {!loading && !error && resultData && (
              <ReactMarkdown>{resultData}</ReactMarkdown>
            )}
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
