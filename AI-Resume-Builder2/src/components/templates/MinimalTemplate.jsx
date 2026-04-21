import React from 'react';

export default function MinimalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div className="template-wrapper template-minimal">
      <div className="preview-header">
        <h1 className="preview-name">{personalInfo?.fullName || 'Your Name'}</h1>
        <div className="preview-contact">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div className="section-grid">
        <h2>About</h2>
        <div>
          <p className="entry-desc" style={{ marginTop: 0 }}>{summary || 'Your summary here...'}</p>
        </div>
      </div>

      {experience && experience.length > 0 && (
        <div className="section-grid">
          <h2>Experience</h2>
          <div>
            {experience.map((exp) => (
              <div key={exp.id} className="preview-entry">
                <div className="entry-title">{exp.position}</div>
                <div className="entry-subtitle">{exp.company} • {exp.startDate} - {exp.endDate}</div>
                {exp.description && <p className="entry-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {education && education.length > 0 && (
        <div className="section-grid">
          <h2>Education</h2>
          <div>
            {education.map((edu) => (
              <div key={edu.id} className="preview-entry">
                <div className="entry-title">{edu.degree} in {edu.field}</div>
                <div className="entry-subtitle">{edu.school}</div>
                <div className="entry-date">{edu.graduationDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="section-grid">
          <h2>Skills</h2>
          <div>
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="skill-group">
                <span className="entry-title" style={{ fontSize: '14px' }}>{skillGroup.category}</span>
                <p className="entry-desc" style={{ marginTop: 2 }}>{skillGroup.skills}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="section-grid">
          <h2>Projects</h2>
          <div>
            {projects.map((project) => (
              <div key={project.id} className="preview-entry">
                <div className="entry-title">{project.title}</div>
                <div className="entry-subtitle">{project.technologies}</div>
                {project.description && <p className="entry-desc">{project.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
