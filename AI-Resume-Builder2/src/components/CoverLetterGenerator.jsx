import React, { useState, useRef } from 'react';
import { Download, Wand2, Loader2, Sparkles } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

export default function CoverLetterGenerator({ resumeData }) {
  const [targetRole, setTargetRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const letterRef = useRef(null);

  const generateCoverLetter = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/cover-letter', {
        resumeData,
        targetRole,
        companyName
      });
      setCoverLetter(data.coverLetter);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter. Did you add your GEMINI_API_KEY?');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    const element = letterRef.current;
    if (!element) return;
    
    const opt = {
      margin: 1,
      filename: `Cover_Letter_${companyName ? companyName.replace(/\s+/g, '_') : 'Generated'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="section-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header-inline">
        <h2>Cover Letter Generator</h2>
        {coverLetter && (
          <button className="btn-primary btn-small" onClick={downloadPdf}>
            <Download size={16} />
            Download PDF
          </button>
        )}
      </div>

      <div style={{ marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px', marginTop: 0 }}>
          Fill in the details below to generate a tailored cover letter using your resume data.
        </p>
        <div className="form-row">
          <div className="form-group">
            <label>Target Role / Position</label>
            <input 
              type="text" 
              placeholder="e.g. Frontend Developer" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Target Company</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Corp" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <button 
          className="btn-primary" 
          onClick={generateCoverLetter}
          disabled={loading || !targetRole}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
          {loading ? 'Generating...' : 'Generate Cover Letter'}
        </button>
      </div>

      {coverLetter && (
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            background: 'white', 
            border: '1px solid #e2e8f0',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        >
          <div ref={letterRef} style={{ whiteSpace: 'pre-wrap', fontFamily: 'serif', lineHeight: 1.6, fontSize: '15px', color: '#1a1a1a', padding: '20px' }}>
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  );
}
