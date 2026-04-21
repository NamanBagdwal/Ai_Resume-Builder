import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function AIEnhanceButton({ text, context, onEnhance }) {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!text) {
      alert("Please enter some text first to enhance.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text, context })
      });
      const data = await response.json();
      if (data.success && data.text) {
        onEnhance(data.text);
      } else {
        alert(data.message || "Failed to enhance text.");
      }
    } catch (err) {
      console.error(err);
      alert("Error reaching AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleEnhance} 
      className="btn-secondary btn-small"
      style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', alignSelf: 'flex-start' }}
      disabled={loading}
    >
      {loading ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} color="#a855f7" />}
      {loading ? 'Enhancing...' : 'Enhance with AI'}
    </button>
  );
}
