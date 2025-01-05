const express = require('express');
const multer = require('multer');
const extractText = require('./utils/extractText');
const summarizeText = require('./utils/summarize');
const { prepareVisualSchemas, generateVisuals } = require('./utils/visualize');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const extractedText = await extractText(filePath);

    const summary = await summarizeText(extractedText);
    const schemas = prepareVisualSchemas(summary);

    const visuals = await generateVisuals(schemas);

    res.status(200).json({ summary, visuals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during processing.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
