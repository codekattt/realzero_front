import axios from 'axios';

const apiKey = process.env.OPEN_AI_API;
const endpoint = 'https://api.openai.com/v1/chat/completions';

export default async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Your task is to analyze the additives in a food and evaluate whether it contains sugar, and if not, what substitute sugar is used in its place, and whether this food has no sugar at all. First, tell us what the most commonly used substitute sugar is in this food, and briefly describe the advantages and disadvantages of that additive. If you do not include any nutritional information or additives, we will see a message saying "We are unable to analyze the nutritional content, please resubmit with the correct photo". Answer in Korean',
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
