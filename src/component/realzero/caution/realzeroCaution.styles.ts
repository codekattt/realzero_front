import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
`;

export const CautionWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Number = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: #538596;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const TopNavigation = styled.div`
  font-size: 18px;
  margin: 50px 0 50px 30px;
  cursor: pointer;

  :hover {
    color: #538596;
  }
`;

export const RzH1 = styled.h1`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
  letter-spacing: -0.8px;
  margin-bottom: 60px;
`;

export const RzH2 = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.5px;
  margin-bottom: 0;
`;

export const RzH4 = styled.h4`
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.5px;
  margin: 16px 0 30px 0;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  max-width: 334px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 80px;
  padding: 0 10px;
  box-sizing: border-box;
`;

const baseImageStyle = `
  width: 48%;
  aspect-ratio: 159 / 229;
  border-radius: 15px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  & img {
    display: block;
    float: inline-end;
    margin: 10px;
  }
`;

export const Img1 = styled.div`
  ${baseImageStyle};
  background-image: url(img/caution1_wrong.webp);
`;

export const Img2 = styled.div`
  ${baseImageStyle};
  background-image: url(img/caution1_correct.webp);
`;

export const Img3 = styled.div`
  ${baseImageStyle};
  background-image: url(img/caution2_wrong.webp);
`;

export const Img4 = styled.div`
  ${baseImageStyle};
  background-image: url(img/caution2_correct.webp);
`;

export const BottomText = styled.div`
  text-align: center;
  margin-bottom: 60px;
  font-size: 13px;
  color: #aeaeae;
`;

export const BottomButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const BottomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50px;
  color: #fff;
  background: #538596;
  width: 90%;
  max-width: 416px;
  height: 61px;
  cursor: pointer;

  :hover {
    background-color: #1a7a9b;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
