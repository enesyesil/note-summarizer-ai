const axios = require('axios');

const summarizeText = async (text) => {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    model: 'text-davinci-003',
    prompt: `Summarize the following text in a structured format:\n${text}`,
    max_tokens: 1000,
  }, {
    headers: { Authorization: `Bearer YOUR_OPENAI_API_KEY` },
  });
  return response.data.choices[0].text;
};
