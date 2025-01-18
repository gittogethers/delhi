Here is a typescript codebase in React and TSX: 

a React component that handles the logo generation form and API call using fetch instead of the OpenAI client library.
Logo Generator Form ComponentClick to open component

it has the following: 

Uses the shadcn/ui components for a polished UI
Handles all form inputs with proper state management
Makes the API call using fetch instead of the OpenAI client
Includes error handling and loading states
Displays the generated logo when available

Code: import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const STYLES = [
  'flashy',
  'tech',
  'corporate',
  'creative'
];

const MODELS = [
  'stability-ai/sdxl',
  'dall-e-3',
  'black-forest-labs/flux-schnell',
  'black-forest-labs/flux-dev'
];

const SIZES = ['256x256', '512x512', '1024x1024'];
const QUALITIES = ['standard', 'hd'];

const LogoGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    style: 'corporate',
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    model: 'black-forest-labs/flux-schnell',
    size: '512x512',
    quality: 'standard'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedLogo, setGeneratedLogo] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePrompt = () => {
    return `A single logo, high-quality, award-winning professional design, made for both digital and print media for ${formData.companyName}. Style: ${formData.style}. Primary color: ${formData.primaryColor}, Background color: ${formData.backgroundColor}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const [width, height] = formData.size.split('x').map(Number);
      
      const response = await fetch('https://api.studio.nebius.ai/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
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

      const data = await response.json();
      
      if (data.data && data.data[0].url) {
        setGeneratedLogo(data.data[0].url);
      } else {
        throw new Error('No image URL in response');
      }
    } catch (err) {
      setError('Failed to generate logo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Logo Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Style</Label>
            <Select
              value={formData.style}
              onValueChange={(value) => handleSelectChange('style', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {STYLES.map(style => (
                  <SelectItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <Input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div className="space-y-2">
              <Label>Background Color</Label>
              <Input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>AI Model</Label>
            <Select
              value={formData.model}
              onValueChange={(value) => handleSelectChange('model', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Image Size</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => handleSelectChange('size', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {SIZES.map(size => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quality</Label>
              <Select
                value={formData.quality}
                onValueChange={(value) => handleSelectChange('quality', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  {QUALITIES.map(quality => (
                    <SelectItem key={quality} value={quality}>
                      {quality.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Generate Logo'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-500 rounded">
            {error}
          </div>
        )}

        {generatedLogo && (
          <div className="mt-4">
            <img 
              src={generatedLogo} 
              alt="Generated Logo" 
              className="w-full rounded shadow"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogoGenerator;
