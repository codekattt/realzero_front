import { useEffect, useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import * as S from './realzeroCaution.styles';

import 'aos/dist/aos.css';
import AOS from 'aos';

export default function RealZeroCaution() {
  const [file, setFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const moveToMain = () => {
    router.push('/main');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) {
      return;
    }
    try {
      const uploadedFile = e.target.files?.[0];
      if (!uploadedFile) {
        alert('이미지 파일을 선택해주세요.');
        return;
      }

      if (!uploadedFile.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      setIsUploading(true);

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const result = reader.result as string;
          setImageBase64(result);
          setFile(uploadedFile);

          const formData = new FormData();
          formData.append('file', uploadedFile);

          const ocrResponse = await axios.post(
            'https://realzero-back.onrender.com/api/ocr',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            },
          );

          if (ocrResponse.data && ocrResponse.data.inferText) {
            const inferTextString = ocrResponse.data.inferText.join(' ');
            router.push({
              pathname: '/results',
              query: {
                loading: true,
                inferText: inferTextString,
                imageBase64: result,
              },
            });
          } else {
            console.error('OCR 응답이 유효하지 않습니다.');
            alert('텍스트가 추출되지 않았습니다. 잠시 후 다시 시도해주세요.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('일시적 오류입니다. 잠시 후 다시 시도해주세요..');
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(uploadedFile);
    } catch (error) {
      console.error('Error:', error);
      alert('파일 처리가 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

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
          <S.TopNavigation onClick={moveToMain}>
            {' '}
            〈 이미지 업로드
          </S.TopNavigation>
          <S.RzH1 data-aos="fade-up">
            정확한 성분 분석을 위한 <br />
            이미지 업로드 GUIDE
          </S.RzH1>
          <S.CautionWrapper data-aos="fade-up">
            <S.Number>1</S.Number>
            <S.RzH2>
              글자가 잘리지 않고,
              <br />
              굴곡지지 않은 이미지가 좋아요!
            </S.RzH2>
            <S.RzH4>
              글자가 잘리거나 너무 굴곡이 있으면
              <br />
              AI가 해당 영역을 정확히 인식하기 어려워요
            </S.RzH4>
            <S.ImgWrapper>
              <S.Img1>
                <img src="img/wrong_icon.png" />
              </S.Img1>
              <S.Img2>
                <img src="img/correct_icon.png" />
              </S.Img2>
            </S.ImgWrapper>
          </S.CautionWrapper>
          <S.CautionWrapper data-aos="fade-up">
            <S.Number>2</S.Number>
            <S.RzH2>
              영양성분, 원재료와 관계없는 글자는
              <br />
              최대한 나오지 않은 사진을 골라주세요.
            </S.RzH2>
            <S.RzH4>
              영양성분 또는 원재료가 아닌
              <br />
              다른 글자가 많이 있을 경우 분석이 어려워요
            </S.RzH4>
            <S.ImgWrapper>
              <S.Img3>
                <img src="img/wrong_icon.png" />
              </S.Img3>
              <S.Img4>
                <img src="img/correct_icon.png" />
              </S.Img4>
            </S.ImgWrapper>
          </S.CautionWrapper>
          <S.BottomText data-aos="fade-up">
            이미지를 업로드하면 바로 분석이 시작됩니다. <br />
            결과 표출까지 최대 2분 소요될 수 있습니다.
          </S.BottomText>
          <S.BottomButtonWrapper>
            <S.BottomButton
              onClick={handleButtonClick}
              disabled={isUploading}
              aria-disabled={isUploading}
            >
              {isUploading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  AI가 이미지 분석 중...
                  <ClipLoader size={18} color={'white'} />
                </div>
              ) : (
                '이미지 업로드'
              )}
            </S.BottomButton>
          </S.BottomButtonWrapper>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={isUploading}
          />
        </S.Wrapper>
      </div>
    </>
  );
}
