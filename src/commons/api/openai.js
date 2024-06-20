import axios from 'axios';

const apiKey = process.env.OPEN_AI_API;
const endpoint = 'https://api.openai.com/v1/chat/completions';

export default async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: '2. 다음 문서에서 영양성분 정보만 뽑아서 표시해주세요.',
          },
          {
            role: 'system',
            content:
              '3. 영양성분이 대체적으로 어떤지 고단백인지, 저지방인지 등을 분석해주세요. 결과값은 번호를 매겨 표시해주세요.',
          },
          {
            role: 'user',
            content: prompt, // 사용자 프롬프트
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // 응답 데이터 구조에 맞게 접근합니다.
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling the ChatGPT API:', error);
    return null;
  }
}
