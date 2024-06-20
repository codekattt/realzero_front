import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as S from './realzeroCaution.styles';

export default function RealZeroCaution() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // 파일 입력 참조 생성
  const router = useRouter();

  const Instruction = ({
    number,
    title,
    title2,
    description,
    description2,
  }) => (
    <S.CautionWrapper>
      <S.Number>{number}</S.Number>
      <S.RzH2>
        {title}
        <br />
        {title2}
      </S.RzH2>
      <S.RzH4>
        {description}
        <br />
        {description2}
      </S.RzH4>
      <S.ImgWrapper>
        <S.Img></S.Img>
        <S.Img></S.Img>
      </S.ImgWrapper>
    </S.CautionWrapper>
  );

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (!uploadedFile) {
      alert('이미지 파일을 업로드해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const ocrResponse = await axios.post(
        'http://localhost:5000/ocr',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (ocrResponse.data && ocrResponse.data.inferText) {
        const inferTextString = ocrResponse.data.inferText.join(' ');

        // 결과 페이지로 즉시 리디렉션하고, 로딩 상태 표시
        router.push({
          pathname: '/results',
          query: {
            loading: true, // 로딩 상태 전달
            inferText: inferTextString,
          },
        });

        // ChatGPT API는 결과 페이지에서 호출
      } else {
        console.error('OCR 응답이 유효하지 않습니다.');
        alert('OCR 처리 결과가 유효하지 않습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('이미지 처리에 실패하였습니다.');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // 파일 입력 창을 열기 위해 클릭 이벤트 트리거
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
          <S.TopNavigation> 〈 이미지 업로드</S.TopNavigation>
          <S.RzH1>
            정확한 성분 분석을 위한 <br />
            이미지 업로드 GUIDE
          </S.RzH1>
          <Instruction
            number="1"
            title="영양성분표가 잘리지 않고,"
            title2="굴곡지지 않은 사진이 좋아요!"
            description="표가 잘리거나 너무 굴곡이 있으면"
            description2="AI가 해당 영역을 정확히 인식하기 어려워요"
          />
          <Instruction
            number="2"
            title="영양성분표가 잘리지 않고,"
            title2="굴곡지지 않은 사진이 좋아요!"
            description="표가 잘리거나 너무 굴곡이 있으면"
            description2="AI가 해당 영역을 정확히 인식하기 어려워요"
          />
          <Instruction
            number="3"
            title="영양성분표가 잘리지 않고,"
            title2="굴곡지지 않은 사진이 좋아요!"
            description="표가 잘리거나 너무 굴곡이 있으면"
            description2="AI가 해당 영역을 정확히 인식하기 어려워요"
          />
          <S.BottomButtonWrapper>
            <S.BottomButton onClick={handleButtonClick}>
              AI 영양성분 분석 시작하기
            </S.BottomButton>
          </S.BottomButtonWrapper>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </S.Wrapper>
      </div>
    </>
  );
}
