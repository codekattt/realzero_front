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
            content:
              'You will be provided with a block of text, and your task is to analyze the additives in the food, tell us if there is sugar, and if not, what substitute sugar is used instead of sugar, and evaluate whether the food is healthy zero sugar. Finally, tell us which substitute sugar is most commonly used in this food. Answer in Korean',
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
