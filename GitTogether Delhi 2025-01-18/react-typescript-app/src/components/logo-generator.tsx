import React, { useState } from 'react';
import './logo-generator.css';

interface FormData {
  companyName: string;
  style: string;
  primaryColor: string;
  backgroundColor: string;
  model: string;
  size: string;
  quality: string;
}

interface ApiResponse {
  data: Array<{ url: string }>;
  id: string;
}

const STYLES = ['flashy', 'tech', 'corporate', 'creative'];
const MODELS = [
  'stability-ai/sdxl',
  'dall-e-3',
  'black-forest-labs/flux-schnell',
  'black-forest-labs/flux-dev'
];
const SIZES = ['256x256', '512x512', '1024x1024'];
const QUALITIES = ['standard', 'hd'];

const LogoGenerator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    style: 'corporate',
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    model: 'black-forest-labs/flux-schnell',
    size: '512x512',
    quality: 'standard'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [generatedLogo, setGeneratedLogo] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePrompt = (): string => {
    return `A single logo, high-quality, award-winning professional design, made for both digital and print media for ${formData.companyName}. Style: ${formData.style}. Primary color: ${formData.primaryColor}, Background color: ${formData.backgroundColor}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const [width, height] = formData.size.split('x').map(Number);
      
      const response = await fetch('/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_NEBIUS_API_KEY}`
        },
        body: JSON.stringify({
          width,
          height,
          num_inference_steps: 4,
          negative_prompt: '',
          seed: -1,
          response_extension: 'jpg',
          response_format: 'url',
          prompt: generatePrompt(),
          model: formData.model
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.data && data.data[0].url) {
        setGeneratedLogo(data.data[0].url);
      } else {
        throw new Error('No image URL in response');
      }
    } catch (err) {
      setError(`Failed to generate logo: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedLogo);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.companyName}-logo.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download the logo');
    }
  };

  return (
    <div className="logo-generator">
      <h1>Logo Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="style">Style</label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleSelectChange}
          >
            {STYLES.map(style => (
              <option key={style} value={style}>
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="color-inputs">
          <div className="form-group">
            <label htmlFor="primaryColor">Primary Color</label>
            <input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="backgroundColor">Background Color</label>
            <input
              type="color"
              id="backgroundColor"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="model">AI Model</label>
          <select
            id="model"
            name="model"
            value={formData.model}
            onChange={handleSelectChange}
          >
            {MODELS.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="size">Image Size</label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleSelectChange}
            >
              {SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quality">Quality</label>
            <select
              id="quality"
              name="quality"
              value={formData.quality}
              onChange={handleSelectChange}
            >
              {QUALITIES.map(quality => (
                <option key={quality} value={quality}>
                  {quality.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Logo'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {generatedLogo && (
        <div className="result">
          <img src={generatedLogo} alt="Generated Logo" />
          <button onClick={handleDownload} className="download-button">
            Download Logo
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoGenerator;
