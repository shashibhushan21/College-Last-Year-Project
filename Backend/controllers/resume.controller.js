import fs from 'fs';
import { createRequire } from 'module';
import mammoth from 'mammoth';
import { v2 as cloudinary } from 'cloudinary';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import User from '../models/User.model.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload and parse resume
// @route   POST /api/resume/upload
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    let extractedText = '';

    // Parse PDF
    if (mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      extractedText = pdfData.text;
    }

    // Parse DOCX
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    }

    if (!extractedText || extractedText.trim().length === 0) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'Could not extract text from the file' });
    }

    // Upload to Cloudinary
    let cloudinaryResult;
    try {
      cloudinaryResult = await cloudinary.uploader.upload(filePath, {
        folder: 'prepai_resumes',
        resource_type: 'raw', // Support non-image files like PDF/DOCX
        use_filename: true,
        unique_filename: true
      });
    } catch (uploadError) {
      // Ignore cloudinary error if credentials aren't set, just fallback to local
      console.warn("Cloudinary upload failed (maybe missing credentials). using local path.");
    }

    const finalResumeUrl = cloudinaryResult?.secure_url || req.file.originalname;

    // Update user's resume text in database
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resumeText: extractedText.trim(),
        resumeFileName: finalResumeUrl // Save the cloudinary URL or original name
      },
      { new: true }
    );

    // Clean up uploaded file from local filesystem
    if (fs.existsSync(filePath)) {
       fs.unlinkSync(filePath);
    }

    res.json({
      message: 'Resume uploaded and parsed successfully',
      resumeText: extractedText.trim().substring(0, 500) + '...',
      resumeFileName: finalResumeUrl
    });
  } catch (error) {
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Error parsing resume', error: error.message });
  }
};

// @desc    Get user's resume data
// @route   GET /api/resume
export const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      resumeText: user.resumeText,
      resumeFileName: user.resumeFileName
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
