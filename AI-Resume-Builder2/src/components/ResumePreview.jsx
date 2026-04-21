import React, { useRef } from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';
import '../styles/templates.css';

export default function ResumePreview({ resumeData, template = 'modern' }) {
  const previewRef = useRef(null);

  const downloadPdf = () => {
    const element = previewRef.current;
    if (!element) return;
    
    const opt = {
      margin: 0,
      filename: `${resumeData?.personalInfo?.fullName?.replace(/\s+/g, '_') || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const renderTemplate = () => {
    switch (template) {
      case 'classic': return <ClassicTemplate resumeData={resumeData} />;
      case 'minimal': return <MinimalTemplate resumeData={resumeData} />;
      case 'modern':
      default: return <ModernTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="resume-preview-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="preview-toolbar" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button className="btn-primary" onClick={downloadPdf}>
          <Download size={16} />
          Download PDF
        </button>
      </div>
      <div 
        className="preview-scroll-area" 
        style={{ flex: 1, overflowY: 'auto', background: '#ccc', padding: '20px', borderRadius: '8px' }}
      >
        <div ref={previewRef} style={{ background: 'white' }}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
