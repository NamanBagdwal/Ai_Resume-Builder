import React, { useState } from 'react';
import { Sparkles, Loader2, Plus } from 'lucide-react';

export default function SkillSuggestor({ onAddSkill }) {
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggest = async () => {
    if (!jobRole) {
      alert("Please enter a job role.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ jobRole })
      });
      const data = await response.json();
      if (data.success && data.skills) {
        setSuggestions(data.skills);
      } else {
        alert(data.message || "Failed to fetch skills.");
      }
    } catch (err) {
      console.error(err);
      alert("Error reaching AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Sparkles size={16} color="#a855f7" /> AI Skill Suggestions
      </h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="e.g. Frontend Developer" 
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
        />
        <button onClick={handleSuggest} disabled={loading} className="btn-primary" style={{ padding: '8px 15px' }}>
          {loading ? <Loader2 size={16} /> : 'Suggest'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {suggestions.map((skill, index) => (
            <button 
              key={index} 
              onClick={() => onAddSkill(skill)}
              style={{ 
                background: '#e0e7ff', color: '#4338ca', border: 'none', 
                padding: '5px 10px', borderRadius: '15px', fontSize: '12px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              <Plus size={12} /> {skill}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
