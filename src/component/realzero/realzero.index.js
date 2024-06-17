import React, { useState } from 'react';
import axios from 'axios';
import { Wrapper, RzTop, Title, Contents, Button } from './realzero.styles';

export default function RealZero() {
  const [file, setFile] = useState(null);
  const [inferText, setInferText] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOCRRequest = async () => {
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setInferText(response.data.inferText);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process the image.');
    }
  };

  return (
    <>
      <Wrapper>
        <RzTop>
          <Title>리얼제로?!</Title>
          <Contents>
            지금 먹고있는 제로식품. <br />
            정말 제로가 맞는지 알아보세요.
          </Contents>
          <Button>지금 시작하기</Button>
        </RzTop>

        <div>
          <h1>리얼 제로</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleOCRRequest}>요청</button>
          {inferText.length > 0 && (
            <div>
              <h2>추출된 텍스트:</h2>
              <ul>
                {inferText.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
}
