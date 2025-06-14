import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
`;

export const TopNavigation = styled.div`
  font-size: 18px;
  width: 120px;
  margin: 50px 0 50px 30px;
  cursor: pointer;
`;

export const ResultWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ResultImage = styled.img`
  width: 90%;
  min-height: 100px;
  max-width: 416px;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
`;

export const Result = styled.div`
  width: 90%;
  max-width: 416px;
  min-height: 336px;
  border-radius: 15px;
  background-color: #eeeeee;
  padding: 24px;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  color: #0c343d;
  white-space: pre-wrap;
`;

export const RzH1 = styled.h1`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  letter-spacing: -0.6px;
  margin-bottom: 40px;
`;

export const BottomCaution = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
  color: #b7b7b7;
  font-size: 14px;
  line-height: 1.6;
  margin: 60px 0;
  padding: 0 15px;
`;

export const BottomButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const BottomButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 16px;
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
