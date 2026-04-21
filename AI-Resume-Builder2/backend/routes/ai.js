const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini Client
// We check if the key is present, if not it will try to use the environment variable
const getGenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing in environment variables.');
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

// @route   POST /api/ai/enhance
// @desc    Enhance grammar, wording, and professionalism
router.post('/enhance', async (req, res) => {
  try {
    const { section, text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required for enhancement.' });
    }

    const ai = getGenAI();
    let prompt = `You are an expert resume writer. Please improve the following text intended for the "${section}" section of a resume. Make it sound professional, action-oriented, and grammatically correct. Do not add made-up information, just improve the framing.\n\nOriginal text:\n"${text}"\n\nImproved text (provide only the improved text and absolutely no conversational filler or markdown code blocks):`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ enhancedText: response.text.trim() });
  } catch (error) {
    console.error('AI Enhance Error:', error.message);
    res.status(500).json({ message: 'Failed to enhance text using AI. Ensure GEMINI_API_KEY is valid.', error: error.message });
  }
});

// @route   POST /api/ai/suggest-skills
// @desc    Suggest relevant skills based on job role
router.post('/suggest-skills', async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Role is required to suggest skills.' });
    }

    const ai = getGenAI();
    let prompt = `You are an expert technical recruiter and resume writer. Based on the job role "${role}", provide a comma-separated list of the 10 most relevant skills a candidate should have. Return ONLY the comma-separated list without any extra formatting, explanations, or bullets.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ suggestedSkills: response.text.trim() });
  } catch (error) {
    console.error('AI Suggest Skills Error:', error.message);
    res.status(500).json({ message: 'Failed to suggest skills using AI.', error: error.message });
  }
});

// @route   POST /api/ai/cover-letter
// @desc    Generate a personalized cover letter
router.post('/cover-letter', async (req, res) => {
  try {
    const { resumeData, targetRole, companyName } = req.body;

    if (!resumeData) {
      return res.status(400).json({ message: 'Resume data is required.' });
    }

    const ai = getGenAI();
    const resumeString = JSON.stringify(resumeData, null, 2);
    
    let prompt = `You are an expert career coach writing a professional cover letter for a candidate. 
    Use the following resume data to write a compelling, tailored cover letter.
    Target Role: ${targetRole || 'Not specified'}
    Company: ${companyName || 'Not specified'}
    
    Resume Data:
    ${resumeString}
    
    Write the cover letter in a standard professional format. Do not use Markdown formatting like **bold** or *italic*, just plain text with appropriate paragraph spacing. Do not include placeholders like "[Your Phone Number]" if the data is available in the resume data; if missing, just leave it out naturally. Give only the Cover Letter text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ coverLetter: response.text.trim() });
  } catch (error) {
    console.error('AI Cover Letter Error:', error.message);
    res.status(500).json({ message: 'Failed to generate cover letter.', error: error.message });
  }
});

module.exports = router;
