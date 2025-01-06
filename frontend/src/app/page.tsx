'use client';

import { useState } from 'react';

const LandingPage = () => {
  const [selectedPurpose, setSelectedPurpose] = useState('quickReview');
  const [selectedStructure, setSelectedStructure] = useState('bulletPoints');
  const [selectedDepth, setSelectedDepth] = useState('moderateDetails');
  const [selectedFormatting, setSelectedFormatting] = useState(['colorCoded']);
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string | null>(null);

  const handleSend = async () => {
    if (!file) return alert('Please upload a file.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', selectedPurpose);
    formData.append('structure', selectedStructure);
    formData.append('depth', selectedDepth);
    formData.append('formatting', selectedFormatting.join(','));

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process file');
      const data = await response.json();

      setOutput(data.output); // Store the output for display
    } catch (error) {
      console.error('Error sending data:', error);
      alert('An error occurred while processing your request.');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Content copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="bg-green-600 shadow-lg w-full max-w-2xl p-6 border-4 border-b-8 border-stone-800 rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to AI Summer</h1>
        <p className="text-center mb-6">
          Upload a file and select options to customize your intelligent summary.
        </p>

        {/* Purpose of Summarization */}
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Purpose of Summarization:</label>
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
            className="w-full p-2 border-black rounded-lg border-b-8 border-4"
          >
            <option value="quickReview">Quick Review</option>
            <option value="detailedStudy">Detailed Study</option>
            <option value="examPreparation">Exam Preparation</option>
            <option value="understandingConcepts">Understanding Concepts</option>
          </select>
        </div>

        {/* Document Structure Preferences */}
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Document Structure:</label>
          <select
            value={selectedStructure}
            onChange={(e) => setSelectedStructure(e.target.value)}
            className="w-full p-2 border-black rounded-lg border-b-8 border-4"
          >
            <option value="bulletPoints">Bullet Points</option>
            <option value="paragraphs">Paragraphs</option>
            <option value="qaFormat">Question-Answer Format</option>
            <option value="visualAids">Visual Aids</option>
          </select>
        </div>

        {/* Depth of Summarization */}
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Depth of Summarization:</label>
          <select
            value={selectedDepth}
            onChange={(e) => setSelectedDepth(e.target.value)}
            className="w-full p-2 border-black rounded-lg border-b-8 border-4"
          >
            <option value="highLevelOverview">High-Level Overview</option>
            <option value="moderateDetails">Moderate Details</option>
            <option value="fullDetails">Full Details</option>
          </select>
        </div>

        {/* Formatting Preferences */}
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Formatting Preferences:</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="colorCoded"
                checked={selectedFormatting.includes('colorCoded')}
                onChange={(e) =>
                  setSelectedFormatting((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((item) => item !== e.target.value)
                  )
                }
                className="mr-2"
              />
              Color-coded Highlights
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="sequentialOrder"
                checked={selectedFormatting.includes('sequentialOrder')}
                onChange={(e) =>
                  setSelectedFormatting((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((item) => item !== e.target.value)
                  )
                }
                className="mr-2"
              />
              Sequential Order
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="categorizedTopics"
                checked={selectedFormatting.includes('categorizedTopics')}
                onChange={(e) =>
                  setSelectedFormatting((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((item) => item !== e.target.value)
                  )
                }
                className="mr-2"
              />
              Categorized Topics
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="headingsSubheadings"
                checked={selectedFormatting.includes('headingsSubheadings')}
                onChange={(e) =>
                  setSelectedFormatting((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((item) => item !== e.target.value)
                  )
                }
                className="mr-2"
              />
              Headings and Subheadings
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-black font-bold mb-2">Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border-black rounded-lg border-b-8 border-4"
          />
        </div>

        <button
          onClick={handleSend}
          className="bg-black text-white py-2 px-4 font-bold rounded-lg border-b-8 border-2 border-stone-800 w-full"
        >
          Submit
        </button>

        {/* Display Output */}
        {output && (
          <div className="mt-6 bg-yellow-400 border-black border-4 rounded-lg p-4 overflow-y-auto h-64">
            <h2 className="text-lg font-bold mb-2">Processed Output:</h2>
            <pre className="whitespace-pre-wrap text-black">{output}</pre>
            <button
              onClick={handleCopy}
              className="mt-4 bg-black text-white py-1 px-3 rounded-lg border-b-4 border-2 border-stone-800"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
