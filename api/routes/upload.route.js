import express from 'express';
import upload from '../middleware/multer.js';

const router = express.Router();

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      url: req.file.path, // Cloudinary file URL
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
    });
  }
});

export default router;