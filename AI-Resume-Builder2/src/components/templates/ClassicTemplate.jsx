import React from 'react';

export default function ClassicTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div className="template-wrapper template-classic">
      <div className="preview-header">
        <h1 className="preview-name">{personalInfo?.fullName || 'Your Name'}</h1>
        <div className="preview-contact">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="preview-section">
          <h2>Summary</h2>
          <p className="entry-desc">{summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="preview-section">
          <h2>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="preview-entry">
              <div className="entry-header-row">
                <span className="entry-title">{exp.position}</span>
                <span className="entry-date">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="entry-subtitle">{exp.company}</div>
              {exp.description && <p className="entry-desc">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div className="preview-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="preview-entry">
              <div className="entry-header-row">
                <span className="entry-title">{edu.school}</span>
                <span className="entry-date">{edu.graduationDate}</span>
              </div>
              <div className="entry-subtitle">{edu.degree} - {edu.field}</div>
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="preview-section">
          <h2>Skills</h2>
          {skills.map((skillGroup) => (
            <div key={skillGroup.id} className="skill-group">
              <strong>{skillGroup.category}:</strong> {skillGroup.skills}
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="preview-section">
          <h2>Projects & Portfolio</h2>
          {projects.map((project) => (
            <div key={project.id} className="preview-entry">
              <div className="entry-header-row">
                <span className="entry-title">{project.title}</span>
              </div>
              {project.description && <p className="entry-desc">{project.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
