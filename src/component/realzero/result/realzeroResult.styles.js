import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 500px;
  height: 100%;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
`;

export const ResultWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const TopNavigation = styled.div`
  font-size: 24px;
  margin: 50px 0 50px 30px;
`;

export const Result = styled.div`
  width: 90%;
  max-width: 416px;
  min-height: 100px;
  border-radius: 15px;
  background-color: #ddd;
  padding: 24px;
  text-align: left;
  font-size: 20px;
  line-height: 1.4;
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

export const Img = styled.div`
  width: 159px;
  height: 229px;
  background-color: #ddd;
  border-radius: 15px;
`;

export const BottomButtonWrapper = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BottomButton = styled.div`
  text-align: center;
  align-content: center;
  border-radius: 50px;
  color: #fff;
  background: #538596;
  width: 416px;
  height: 61px;
  cursor: pointer;
`;
