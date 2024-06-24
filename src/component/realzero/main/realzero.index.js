import React, { useState, useRef } from 'react';
import * as S from './realzero.styles';
import { useRouter } from 'next/router';

export default function RealZero() {
  const [file, setFile] = useState(null);
  const [inferText, setInferText] = useState([]);
  const fileInputRef = useRef(null); // 파일 입력 참조 생성
  const router = useRouter();

  const moveToCaution = () => {
    router.push('/caution');
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
          <S.RzTop>
            <S.Title>리얼제로?!</S.Title>
            <S.Contents>
              지금 먹고있는 제로식품. <br />
              정말 제로가 맞는지 알아보세요.
            </S.Contents>
            <S.TopButton onClick={moveToCaution}>지금 시작하기</S.TopButton>
          </S.RzTop>
          <S.RzOne>
            <S.RzH1>
              설탕은 없지만,
              <br />
              건강은 있나요?
            </S.RzH1>
            <S.TextWrapper>
              <S.RzH3>"제로라고 하는데 성분은 괜찮을까?"</S.RzH3>
              <S.RzH3>"설탕 대신 무엇이 들어있을가?"</S.RzH3>
            </S.TextWrapper>
            <S.RzH5>
              점점 늘어나는 제로식품 시대
              <br />
              지금 먹는제로, 건강한 제로일까요?
              <br />
              AI의 평가를 확인해보세요.
            </S.RzH5>
          </S.RzOne>
          <S.RzTwo>
            <S.RzH1>
              고단백, 저지방
              <br />
              어떤 영양성분일까?
            </S.RzH1>
            <S.RzTwoImgWrapper></S.RzTwoImgWrapper>
            <S.RzH5>
              영양성분표를 찍고 업로드하면
              <br />
              고단백, 저탄수, 저지방 등<br />
              어떤 영양성분인지 AI가 분석해줘요.
            </S.RzH5>
          </S.RzTwo>
          <S.RzThree>
            <S.RzH1>
              AI로 알아보는
              <br />
              대체당 성분 평가
            </S.RzH1>
            <S.RzThreeImgWrapper>
              <S.RzThreeImg1></S.RzThreeImg1>
              <S.RzThreeImg2></S.RzThreeImg2>
            </S.RzThreeImgWrapper>
            <S.RzThreeImgWrapper>
              <S.RzThreeImg3></S.RzThreeImg3>
              <S.RzThreeImg4></S.RzThreeImg4>
            </S.RzThreeImgWrapper>
            <S.RzH5>
              첨가물 또는 원재료 사진을 업로드하고 <br />
              건강한 대체당 성분이 포함되었는지
              <br />
              AI 평가를 확인해보세요.
            </S.RzH5>
          </S.RzThree>
          <S.BottomButtonWrapper>
            <S.BottomButton onClick={moveToCaution}>
              AI 영양성분 분석 시작하기
            </S.BottomButton>
          </S.BottomButtonWrapper>
        </S.Wrapper>
      </div>
    </>
  );
}
