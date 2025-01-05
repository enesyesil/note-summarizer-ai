const { OpenAI } = require('langchain/llms');
const { SummarizationChain } = require('langchain/chains');

const summarizeText = async (text) => {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
  });

  const chain = new SummarizationChain({ llm });
  const summary = await chain.call({ input: text });
  return summary;
};

module.exports = summarizeText;
