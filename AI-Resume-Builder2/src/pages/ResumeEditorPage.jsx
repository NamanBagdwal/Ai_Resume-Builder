import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Eye, LayoutTemplate, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import axios from 'axios';
import '../styles/editor.css';
import ResumePreview from '../components/ResumePreview';
import CoverLetterGenerator from '../components/CoverLetterGenerator';

export default function ResumeEditorPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentResume, updateResume } = useResume();
  const [resumeData, setResumeData] = useState(null);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [saved, setSaved] = useState(true);
  const [saving, setSaving] = useState(false);
  const [template, setTemplate] = useState('modern');
  
  // AI Loading States
  const [aiLoading, setAiLoading] = useState({});

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!currentResume) {
    navigate('/dashboard');
    return null;
  }

  useEffect(() => {
    if (currentResume) {
      setResumeData({
        personalInfo: currentResume.personalInfo || {},
        summary: currentResume.summary || '',
        experience: currentResume.experience || [],
        education: currentResume.education || [],
        skills: currentResume.skills || [],
        projects: currentResume.projects || [],
      });
    }
  }, [currentResume]);

  const handleSave = async () => {
    if (resumeData && currentResume) {
      try {
        setSaving(true);
        await updateResume(currentResume._id, resumeData);
        setSaved(true);
      } catch (error) {
        console.error('Failed to save resume:', error);
        alert('Failed to save resume. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setResumeData((prev) => {
      const updated = { ...prev };
      const fields = field.split('.');
      let obj = updated;
      for (let i = 0; i < fields.length - 1; i++) {
        obj = obj[fields[i]];
      }
      obj[fields[fields.length - 1]] = value;
      return updated;
    });
    setSaved(false);
  };

  /* ----- AI Functions ----- */
  const enhanceText = async (section, text, onUpdate, id) => {
    if (!text) return;
    const loadingKey = id ? `${section}-${id}` : section;
    setAiLoading((prev) => ({ ...prev, [loadingKey]: true }));
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/enhance', { section, text });
      onUpdate(data.enhancedText);
    } catch (err) {
      console.error(err);
      alert('Failed to enhance text. Check if Gemini API key is configured.');
    } finally {
      setAiLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const suggestSkills = async (role, id) => {
    if (!role) {
      alert("Please provide a category/role in the 'Category' field first!");
      return;
    }
    const loadingKey = `skills-${id}`;
    setAiLoading((prev) => ({ ...prev, [loadingKey]: true }));
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/suggest-skills', { role });
      updateSkill(id, 'skills', data.suggestedSkills);
    } catch (err) {
      console.error(err);
      alert('Failed to suggest skills. Check if Gemini API key is configured.');
    } finally {
      setAiLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  /* ----- List Resets/Updates ----- */
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), { id: Date.now(), position: '', company: '', startDate: '', endDate: '', description: '' }],
    }));
    setSaved(false);
  };
  const removeExperience = (id) => {
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((exp) => exp.id !== id) }));
    setSaved(false);
  };
  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
    setSaved(false);
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...(prev.education || []), { id: Date.now(), degree: '', school: '', field: '', graduationDate: '' }],
    }));
    setSaved(false);
  };
  const removeEducation = (id) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }));
    setSaved(false);
  };
  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
    setSaved(false);
  };

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), { id: Date.now(), category: '', skills: '' }],
    }));
    setSaved(false);
  };
  const removeSkill = (id) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((skill) => skill.id !== id) }));
    setSaved(false);
  };
  const updateSkill = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }));
    setSaved(false);
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), { id: Date.now(), title: '', description: '', technologies: '', link: '' }],
    }));
    setSaved(false);
  };
  const removeProject = (id) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((project) => project.id !== id) }));
    setSaved(false);
  };
  const updateProject = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }));
    setSaved(false);
  };

  if (!resumeData) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="editor-container">
      {/* Header */}
      <header className="editor-header">
        <div className="header-left">
          <button className="btn-icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={24} />
          </button>
          <h1>{currentResume.title}</h1>
        </div>
        <div className="header-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px' }}>
            <LayoutTemplate size={16} color="#64748b" />
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 600, color: '#334155', cursor: 'pointer' }}
            >
              <option value="modern">Modern Design</option>
              <option value="classic">Classic Formal</option>
              <option value="minimal">Minimalist</option>
            </select>
          </div>
          <button className="btn-primary" onClick={handleSave} disabled={saved || saving}>
            <Save size={18} />
            {saving ? 'Saving...' : saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </header>

      <div className="editor-main">
        {/* LEFT PANE: Sidebar Navigation */}
        <aside className="editor-sidebar">
          <nav className="section-nav">
            {[
              { id: 'personalInfo', label: '👤 Personal Info' },
              { id: 'summary', label: '📝 Summary' },
              { id: 'experience', label: '💼 Experience' },
              { id: 'education', label: '🎓 Education' },
              { id: 'skills', label: '⚡ Skills' },
              { id: 'projects', label: '🚀 Projects' },
              { id: 'coverLetter', label: '✉️ Cover Letter' },
            ].map((section) => (
              <button
                key={section.id}
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MIDDLE PANE: Editor Content */}
        <section className="editor-content">
          {activeSection === 'personalInfo' && (
            <div className="section-panel">
              <h2>Personal Information</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={resumeData.personalInfo.fullName || ''} onChange={(e) => handleInputChange('personalInfo.fullName', e.target.value)} placeholder="John Doe" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={resumeData.personalInfo.email || ''} onChange={(e) => handleInputChange('personalInfo.email', e.target.value)} placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" value={resumeData.personalInfo.phone || ''} onChange={(e) => handleInputChange('personalInfo.phone', e.target.value)} placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" value={resumeData.personalInfo.location || ''} onChange={(e) => handleInputChange('personalInfo.location', e.target.value)} placeholder="New York, NY" />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input type="url" value={resumeData.personalInfo.linkedIn || ''} onChange={(e) => handleInputChange('personalInfo.linkedIn', e.target.value)} placeholder="https://linkedin.com/in/johndoe" />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'summary' && (
            <div className="section-panel">
              <div className="section-header-inline">
                <h2>Professional Summary</h2>
                <button 
                  className="btn-secondary btn-small"
                  onClick={() => enhanceText('summary', resumeData.summary, (val) => handleInputChange('summary', val))}
                  disabled={aiLoading['summary'] || !resumeData.summary}
                >
                  {aiLoading['summary'] ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />}
                  Enhance with AI
                </button>
              </div>
              <div className="form-group">
                <textarea value={resumeData.summary || ''} onChange={(e) => handleInputChange('summary', e.target.value)} placeholder="Brief overview of your professional background..." rows={6} />
              </div>
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="section-panel">
              <div className="section-header-inline">
                <h2>Work Experience</h2>
                <button className="btn-primary btn-small" onClick={addExperience}><Plus size={16} /> Add Experience</button>
              </div>
              {resumeData.experience?.map((exp) => (
                <div key={exp.id} className="entry-card">
                  <div className="entry-header">
                    <h3>{exp.position || 'Position'}</h3>
                    <button className="btn-icon btn-danger-small" onClick={() => removeExperience(exp.id)}><Trash2 size={16} /></button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Position</label>
                      <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Senior Software Engineer" />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Your Company" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group" style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                      <label style={{ margin: 0 }}>Description</label>
                      <button 
                        className="btn-secondary btn-small" 
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => enhanceText('experience', exp.description, (val) => updateExperience(exp.id, 'description', val), exp.id)}
                        disabled={aiLoading[`experience-${exp.id}`] || !exp.description}
                      >
                        {aiLoading[`experience-${exp.id}`] ? <Loader2 size={12} className="spin" /> : <Sparkles size={12} />} Enhance
                      </button>
                    </div>
                    <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="Responsibilities and achievements..." rows={4} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'education' && (
            <div className="section-panel">
              <div className="section-header-inline">
                <h2>Education</h2>
                <button className="btn-primary btn-small" onClick={addEducation}><Plus size={16} /> Add Education</button>
              </div>
              {resumeData.education?.map((edu) => (
                <div key={edu.id} className="entry-card">
                  <div className="entry-header">
                    <h3>{edu.degree || 'Degree'}</h3>
                    <button className="btn-icon btn-danger-small" onClick={() => removeEducation(edu.id)}><Trash2 size={16} /></button>
                  </div>
                  <div className="form-group">
                    <label>Degree</label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                  </div>
                  <div className="form-group">
                    <label>School/University</label>
                    <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="University Name" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Field of Study</label>
                      <input type="text" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
                    </div>
                    <div className="form-group">
                      <label>Graduation Date</label>
                      <input type="month" value={edu.graduationDate} onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="section-panel">
              <div className="section-header-inline">
                <h2>Skills</h2>
                <button className="btn-primary btn-small" onClick={addSkill}><Plus size={16} /> Add Skill Group</button>
              </div>
              {resumeData.skills?.map((skill) => (
                <div key={skill.id} className="entry-card">
                  <div className="entry-header">
                    <h3>{skill.category || 'Skill Category'}</h3>
                    <button className="btn-icon btn-danger-small" onClick={() => removeSkill(skill.id)}><Trash2 size={16} /></button>
                  </div>
                  <div className="form-group">
                    <label>Category (Role/Tech Area)</label>
                    <input type="text" value={skill.category} onChange={(e) => updateSkill(skill.id, 'category', e.target.value)} placeholder="e.g., Frontend Developer" />
                  </div>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                      <label style={{ margin: 0 }}>Skills (comma-separated)</label>
                      <button 
                        className="btn-secondary btn-small" 
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => suggestSkills(skill.category, skill.id)}
                        disabled={aiLoading[`skills-${skill.id}`] || !skill.category}
                      >
                        {aiLoading[`skills-${skill.id}`] ? <Loader2 size={12} className="spin" /> : <Sparkles size={12} />} Suggest Skills
                      </button>
                    </div>
                    <input type="text" value={skill.skills} onChange={(e) => updateSkill(skill.id, 'skills', e.target.value)} placeholder="React, Vue, HTML, CSS" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'projects' && (
            <div className="section-panel">
              <div className="section-header-inline">
                <h2>Projects</h2>
                <button className="btn-primary btn-small" onClick={addProject}><Plus size={16} /> Add Project</button>
              </div>
              {resumeData.projects?.map((project) => (
                <div key={project.id} className="entry-card">
                  <div className="entry-header">
                    <h3>{project.title || 'Project'}</h3>
                    <button className="btn-icon btn-danger-small" onClick={() => removeProject(project.id)}><Trash2 size={16} /></button>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Project Title</label>
                      <input type="text" value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)} placeholder="Project Name" />
                    </div>
                    <div className="form-group">
                      <label>Technologies</label>
                      <input type="text" value={project.technologies} onChange={(e) => updateProject(project.id, 'technologies', e.target.value)} placeholder="React, Node.js" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                      <label style={{ margin: 0 }}>Description</label>
                      <button 
                        className="btn-secondary btn-small" 
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => enhanceText('project', project.description, (val) => updateProject(project.id, 'description', val), project.id)}
                        disabled={aiLoading[`project-${project.id}`] || !project.description}
                      >
                        {aiLoading[`project-${project.id}`] ? <Loader2 size={12} className="spin" /> : <Sparkles size={12} />} Enhance
                      </button>
                    </div>
                    <textarea value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)} placeholder="What did you build?" rows={3} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'coverLetter' && (
            <CoverLetterGenerator resumeData={resumeData} />
          )}
        </section>

        {/* RIGHT PANE: Live Preview */}
        {activeSection !== 'coverLetter' && (
          <aside className="editor-preview-pane">
            <ResumePreview resumeData={resumeData} template={template} />
          </aside>
        )}
        
      </div>
    </div>
  );
}
