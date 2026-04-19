import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Copy, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { resumes, createResume, deleteResume, duplicateResume, loadResume } = useResume();
  const [newResumeName, setNewResumeName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (newResumeName.trim()) {
      try {
        setLoading(true);
        await createResume(newResumeName);
        setNewResumeName('');
        setShowCreateForm(false);
      } catch (error) {
        console.error('Failed to create resume:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditResume = async (resumeId) => {
    try {
      setLoading(true);
      await loadResume(resumeId);
      navigate('/editor');
    } catch (error) {
      console.error('Failed to load resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateResume = async (resume) => {
    try {
      setLoading(true);
      await duplicateResume(resume._id);
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        setLoading(true);
        await deleteResume(resumeId);
      } catch (error) {
        console.error('Failed to delete resume:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>📄 Resume Builder</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>Welcome, {user.name}</span>
          </div>
          <button className="btn-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h2>Your Resumes</h2>
            <p>{resumes.length} resume{resumes.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus size={18} />
            New Resume
          </button>
        </div>

        {/* Create Resume Form */}
        {showCreateForm && (
          <div className="create-form-card">
            <form onSubmit={handleCreateResume} className="create-form">
              <input
                type="text"
                placeholder="e.g., Software Engineer Resume, Data Analyst Role"
                value={newResumeName}
                onChange={(e) => setNewResumeName(e.target.value)}
                autoFocus
                required
              />
              <div className="form-buttons">
                <button type="submit" className="btn-primary">
                  <Plus size={18} />
                  Create
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Resumes Grid */}
        {resumes.length > 0 ? (
          <div className="resumes-grid">
            {resumes.map((resume) => (
              <div key={resume._id} className="resume-card">
                <div className="resume-card-header">
                  <h3>{resume.title}</h3>
                  <div className="card-actions">
                    <button
                      className="btn-icon"
                      onClick={() => handleEditResume(resume._id)}
                      title="Edit resume"
                      disabled={loading}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => handleDuplicateResume(resume)}
                      title="Duplicate resume"
                      disabled={loading}
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteResume(resume._id)}
                      title="Delete resume"
                      disabled={loading}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="resume-card-info">
                  <div className="info-item">
                    <span className="label">Created:</span>
                    <span>{formatDate(resume.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Modified:</span>
                    <span>{formatDate(resume.updatedAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Versions:</span>
                    <span>{resume.versions?.length || 0}</span>
                  </div>
                </div>

                <div className="resume-card-footer">
                  {resume.personalInfo?.fullName && (
                    <div className="person-name">
                      {resume.personalInfo.fullName}
                    </div>
                  )}
                  <button
                    className="btn-primary btn-small"
                    onClick={() => handleEditResume(resume._id)}
                    disabled={loading}
                  >
                    Edit Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No resumes yet</h3>
            <p>Create your first resume to get started</p>
            <button
              className="btn-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <Plus size={18} />
              Create First Resume
            </button>
          </div>
        )}
      </main>

      {/* Desktop Logout Button */}
      <div className="desktop-logout">
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
