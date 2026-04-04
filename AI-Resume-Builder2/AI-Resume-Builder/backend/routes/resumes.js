const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);



// ===============================
// GET ALL RESUMES
// ===============================
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error('Fetch resumes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resumes',
    });
  }
});



// ===============================
// CREATE RESUME
// ===============================
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      title,
    });

    res.status(201).json({
      success: true,
      message: 'Resume created',
      resume,
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create resume',
    });
  }
});



// ===============================
// GET SINGLE RESUME
// ===============================
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resume',
    });
  }
});



// ===============================
// UPDATE RESUME
// ===============================
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const {
      title,
      personalInfo,
      summary,
      experience,
      education,
      skills,
      projects,
      atsScore,
    } = req.body;

    // Version snapshot
    const versionNumber = (resume.versions?.length || 0) + 1;

    const snapshot = {
      versionNumber,
      createdAt: new Date(),
      data: {
        title: resume.title,
        personalInfo: resume.personalInfo,
        summary: resume.summary,
        experience: resume.experience,
        education: resume.education,
        skills: resume.skills,
        projects: resume.projects,
      },
    };

    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          personalInfo,
          summary,
          experience,
          education,
          skills,
          projects,
          atsScore,
        },
        $push: { versions: snapshot },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Resume updated',
      resume: updated,
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update resume',
    });
  }
});



// ===============================
// DELETE RESUME
// ===============================
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Resume deleted',
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resume',
    });
  }
});



// ===============================
// DUPLICATE RESUME
// ===============================
router.post('/:id/duplicate', async (req, res) => {
  try {
    const original = await Resume.findById(req.params.id);

    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    if (original.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const copy = await Resume.create({
      userId: req.user.id,
      title: `${original.title} (Copy)`,
      personalInfo: original.personalInfo,
      summary: original.summary,
      experience: original.experience,
      education: original.education,
      skills: original.skills,
      projects: original.projects,
      atsScore: original.atsScore,
      versions: [],
    });

    res.status(201).json({
      success: true,
      message: 'Resume duplicated',
      resume: copy,
    });
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate resume',
    });
  }
});

module.exports = router;