import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { OpenAI } from '@langchain/openai';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { loadSummarizationChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";
import AnthropicAI from 'anthropic-ai'; // Assuming there's an AnthropicAI package

// Directory for storing uploads
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Disable body parsing for handling file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const formatSummary = (summary: string, formatting: string[]): string => {
  let formattedSummary = summary;

  if (formatting.includes('colorCoded')) {
    formattedSummary = `**Color-coded Highlights**\n${formattedSummary}`;
  }
  if (formatting.includes('sequentialOrder')) {
    formattedSummary = `**Sequential Order**\n${formattedSummary}`;
  }
  if (formatting.includes('categorizedTopics')) {
    formattedSummary = `**Categorized Topics**\n${formattedSummary}`;
  }
  if (formatting.includes('headingsSubheadings')) {
    formattedSummary = `**Headings and Subheadings**\n${formattedSummary}`;
  }

  return formattedSummary;
};

const summarizeContent = async (filePath: string, options: any): Promise<string> => {
  // Load text from file
  const loader = new TextLoader(filePath);
  const docs = await loader.load();

  // Summarization using LangChain and OpenAI
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
  });

  const chain = loadSummarizationChain(llm);
  const summary = await chain.invoke(docs);

  // Format summary based on user preferences
  return formatSummary(summary.text, options.formatting);
};

const generateVisualDiagrams = async (summary: string, options: any): Promise<string> => {
  // Generate text embeddings using OpenAIEmbeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-ada-002"
  });
  const embeddingResult = await embeddings.embedQuery(summary);

  // Use Anthropic AI to generate visual diagrams based on embeddings
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    throw new Error('Anthropic API key is not defined');
  }
  
  const anthropicAI = new AnthropicAI(anthropicApiKey);

  // Assuming generateVisualDiagrams is not a valid method, replace it with a placeholder or remove it
  const visualDiagrams = "Visual diagrams generation is not implemented.";
  return visualDiagrams;
};

export async function POST(req: Request) {
  const nodeReq = (req as any).req; // Convert to Node.js IncomingMessage

  const form = new formidable.IncomingForm({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return resolve(
          NextResponse.json({ error: 'Failed to process the request' }, { status: 500 })
        );
      }

      try {
        const file = files.file as unknown as formidable.File;
        const filePath = file.filepath;

        const options = {
          purpose: fields.purpose,
          structure: fields.structure,
          depth: fields.depth,
          formatting: fields.formatting ? (typeof fields.formatting === 'string' ? (fields.formatting as string).split(',') : fields.formatting) : [],
        };

        // Summarize the content
        const summary = await summarizeContent(filePath, options);

        // Generate visual diagrams using OpenAI text embeddings and Anthropic AI
        const visualDiagrams = await generateVisualDiagrams(summary, options);

        // Combine summary and diagram
        const output = `${summary}\n\n${visualDiagrams}`;

        resolve(NextResponse.json({ output }));
      } catch (error) {
        console.error('Error processing file:', error);
        resolve(
          NextResponse.json({ error: 'An error occurred during processing' }, { status: 500 })
        );
      }
    });
  });
}