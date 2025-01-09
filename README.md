# Lecture Note Summarizer

## Overview
The **Lecture Note Summarizer** helps students, especially those from neurodiverse backgrounds, by converting lecture notes into structured and accessible formats. It supports PDF and text uploads, uses AI for summarization, and offers visual outputs that can be enhanced with new prompts.
Note: This application is currently under development.
---

## Features
- Accepts PDF and plain text files.
- Uses OpenAI and Anthropic APIs for summarization and visualization.
- Built with LangChain for flexibility to integrate various AI tools.
- Outputs structured summaries and visual representations.

---

## Technologies
- **Frontend**: Next.js (to be enhanced later).
- **Backend**: Node.js with Express, LangChain, Multer, and pdf-parse.
- **Deployment**: Cloud platform TBD.

---

## Setup

### Clone the Repository
```bash
git clone https://github.com/enesyesil/note-summarizer-ai.git
cd lecture-note-summarizer
```

### Install Dependencies
#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd backend
npm install
```

### Add Environment Variables
Create a `.env` file in the backend:
```
OPENAI_API_KEY=your_openai_api_key
ANTROPHIC_API_KEY=your_claude_api_key
```

### Run the Application
#### Frontend
```bash
cd frontend
npm run dev
```
#### Backend
```bash
cd backend
node index.js
```
Frontend: `http://localhost:3000` | Backend: `http://localhost:5000`

---

## How It Works
1. **Upload Files**: Upload PDFs or text files via the frontend.
2. **Extract Text**: Text is extracted using `pdf-parse`.
3. **AI Summarization**: LangChain sends text to OpenAI or Anthropic AI for structured summaries.
4. **Visualization**: Summaries are converted to schemas and visualized using Anthropic’s API.
5. **Output**: Users can enhance outputs with new prompts and are always welcome to try their own prompts to refine and customize the results. 

   This feature allows for experimentation, enabling users to explore creative ways of structuring and summarizing content. Finding the perfect output can be challenging because lecture notes vary in complexity, tone, and structure. Sharing your work and experimenting with different prompts fosters continuous improvement and showcases unique perspectives.


# Input Options for Lecture Note Summarizer

This project collects inputs through selection-based options to create standardized outputs. Below are the key categories and their options:

## 1. Purpose of Summarization
- Quick Review
- Detailed Study
- Exam Preparation
- Understanding Concepts

## 2. Document Structure Preferences
- Bullet Points
- Paragraphs
- Question-Answer Format
- Visual Aids (e.g., tables, charts)

## 3. Key Information to Extract
- Definitions and Concepts
- Examples and Applications
- Main Arguments/Theories
- Dates and Figures
- References

## 4. Depth of Summarization
- High-Level Overview
- Moderate Details
- Full Details

## 5. Formatting Preferences
- Color-coded Highlights
- Sequential Order
- Categorized Topics
- Headings and Subheadings

## 6. Specific Lecture Focus
- Conceptual Understanding
- Technical Details
- Historical Context
- Practical Tips/Applications

## 7. Intended Audience
- High School Students
- Undergraduate Students
- Graduate Students/Researchers

## 8. Type of Material to Summarize
- Lecture Notes
- Research Articles
- Textbooks
- Presentations

## 9. Additional Features
- Add Glossary
- Include Visual Summaries
- Link to Resources
- Highlight Action Items

These options ensure the summarizer is user-friendly, adaptable, and capable of producing high-quality, consistent outputs. Feel free to suggest additional categories or options.

---

## Future Enhancements
- Add user accounts for saving work.
- Support for multiple languages.
- Advanced interactive visualizations.
- Text to speech?

---

## License
Licensed under the MIT License. See LICENSE file for details.
