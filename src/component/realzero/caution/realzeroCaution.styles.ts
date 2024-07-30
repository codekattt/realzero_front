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
  font-size: 24px;
  margin: 50px 0 50px 30px;
  cursor: pointer;

  :hover {
    color: #538596;
  }
`;

export const RzH1 = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  line-height: normal;
  letter-spacing: -0.8px;
  margin-bottom: 80px;
`;

export const RzH2 = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
  margin-bottom: 0;
`;

export const RzH4 = styled.h4`
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.64px;
  margin: 16px 0 30px 0;
`;

export const ImgWrapper = styled.div`
  width: 334px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 80px;
`;

export const Img1 = styled.div`
  width: 159px;
  height: 229px;
  background-color: #ddd;
  border-radius: 15px;
  background-image: url(img/caution1_wrong.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  & img {
    display: block;
    float: inline-end;
    margin: 10px;
  }
`;

export const Img2 = styled.div`
  width: 159px;
  height: 229px;
  background-color: #ddd;
  border-radius: 15px;
  background-image: url(img/caution1_correct.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  & img {
    display: block;
    float: inline-end;
    margin: 10px;
  }
`;
export const Img3 = styled.div`
  width: 159px;
  height: 229px;
  background-color: #ddd;
  border-radius: 15px;
  background-image: url(img/caution2_wrong.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  & img {
    display: block;
    float: inline-end;
    margin: 10px;
  }
`;
export const Img4 = styled.div`
  width: 159px;
  height: 229px;
  background-color: #ddd;
  border-radius: 15px;
  background-image: url(img/caution2_correct.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  & img {
    display: block;
    float: inline-end;
    margin: 10px;
  }
`;

export const BottomText = styled.div`
  text-align: center;
  margin-bottom: 60px;
  font-size: 14px;
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

export const BottomButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;
