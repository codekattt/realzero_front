import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
`;

export const RzTop = styled.div`
  width: 100%;
  max-width: 500px;
  height: 600px;
  background-image: url('img/realzero_main_gpt_opacity.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.div`
  color: #fff;
  text-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -1.2px;
  margin-bottom: 20px;
`;

export const Contents = styled.div`
  color: #fff;
  text-shadow: 0px 2px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.5px;
  margin-bottom: 22px;
`;

export const TopButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  color: #538596;
  background: rgba(255, 255, 255, 1);
  width: 90%;
  max-width: 416px;
  height: 61px;
  margin-bottom: 52px;
  cursor: pointer;

  :hover {
    color: white;
    background-color: #538596;
  }
`;

export const RzOne = styled.div`
  width: 100%;
  max-width: 500px;
  height: 503px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const RzTwo = styled.div`
  width: 100%;
  max-width: 500px;
  height: 703px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const RzThree = styled.div`
  width: 100%;
  max-width: 500px;
  height: 843px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 100px;
`;

export const RzH1 = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -1px;
  margin-bottom: 30px;
`;

export const RzH3 = styled.h3`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.5px;
  margin: 20px 0;
  border-radius: 50px;
  padding: 10px 24px;
  background-color: white;
`;

export const RzH5 = styled.h5`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.4px;
  margin-top: 30px;
`;

export const TextWrapper = styled.div``;

export const RzTwoImgWrapper = styled.div`
  width: calc(100% - 20px);
  max-width: 319px;
  aspect-ratio: 319 / 341;
  background-color: #ddd;
  border-radius: 15px;
  background-image: url(img/main_part2.webp);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const RzThreeImgWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 334px;
  padding: 0 12px;
  box-sizing: border-box;
`;

const baseImageStyle = `
  width: 48%;
  aspect-ratio: 159 / 229;
  border-radius: 15px;
  background-color: #ddd;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const RzThreeImg1 = styled.div`
  ${baseImageStyle};
  background-image: url(img/main_sugar.webp);
`;

export const RzThreeImg2 = styled.div`
  ${baseImageStyle};
  background-image: url(img/main_al.webp);
`;

export const RzThreeImg3 = styled.div`
  ${baseImageStyle};
  background-image: url(img/main_honey.webp);
`;

export const RzThreeImg4 = styled.div`
  ${baseImageStyle};
  background-image: url(img/main_fruit.webp);
`;

export const BottomButtonWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: none;
  position: fixed;
  bottom: 0;
`;

export const BottomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
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
