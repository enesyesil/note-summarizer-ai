const { CustomOutputParser } = require('langchain/parsers');
const axios = require('axios');

const prepareVisualSchemas = (summary) => {
  const parser = new CustomOutputParser({
    parse: (text) => {
      const dataPoints = text.split('\n').filter((line) => line.includes(':'));
      return dataPoints.map((point) => {
        const [label, value] = point.split(':');
        return { label: label.trim(), value: parseInt(value.trim(), 10) };
      });
    },
  });

  return parser.parse(summary);
};

const generateVisuals = async (schemas) => {
  const response = await axios.post('https://claude.api/visualize', { schemas }, {
    headers: { Authorization: `Bearer ${process.env.CLAUDE_API_KEY}` },
  });

  return response.data.visuals;
};

module.exports = { prepareVisualSchemas, generateVisuals };
