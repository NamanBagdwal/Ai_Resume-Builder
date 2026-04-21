const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      email:    { type: String, default: '' },
      phone:    { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website:  { type: String, default: '' },
    },
    summary: { type: String, default: '' },
    experience: [
      {
        position:         { type: String, default: '' },
        company:          { type: String, default: '' },
        startDate:        { type: String, default: '' },
        endDate:          { type: String, default: '' },
        currentlyWorking: { type: Boolean, default: false },
        description:      { type: String, default: '' },
      },
    ],
    education: [
      {
        degree:         { type: String, default: '' },
        field:          { type: String, default: '' },
        school:         { type: String, default: '' },
        graduationDate: { type: String, default: '' },
      },
    ],
    skills: [
      {
        category: { type: String, default: '' },
        items:    [{ type: String }],
      },
    ],
    projects: [
      {
        title:        { type: String, default: '' },
        description:  { type: String, default: '' },
        technologies: [{ type: String }],
        link:         { type: String, default: '' },
      },
    ],
    atsScore: { type: Number, default: 0 },
    versions: [
      {
        versionNumber: { type: Number },
        createdAt:     { type: Date, default: Date.now },
        data:          { type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);