import axios from 'axios';

export default async function GetChatGPTResponse(prompt: string) {
  try {
    const response = await axios.post('http://localhost:8080/api/openai', {
      prompt,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    return null;
  }
}
