
import React, { useState, useCallback } from 'react';
import TerminalWindow from '../components/TerminalWindow';
import AnimatedText from '../components/AnimatedText';
import Section from '../components/Section'; // Added by Naveen on January 10, 2025
import { INPUT_CLASSES, BUTTON_CLASSES, TYPING_TEXT_CYAN_CLASS } from '../constants';

interface ImageInfo {
  name: string;
  type: string;
  size: string; // Formatted string
  dimensions?: string; // WxH
  lastModified?: string;
}

interface MockExifData {
  [key: string]: string | number;
}

const ImageExifPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [mockExif, setMockExif] = useState<MockExifData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Invalid file type. Please select an image.");
        setSelectedFile(null);
        setImagePreview(null);
        setImageInfo(null);
        setMockExif(null);
        return;
      }
      setError(null);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const img = new Image();
      img.onload = () => {
        setImageInfo({
          name: file.name,
          type: file.type,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          dimensions: `${img.width}x${img.height}`,
          lastModified: new Date(file.lastModified).toLocaleString(),
        });
      }
      img.src = URL.createObjectURL(file);
      

      // Simulate EXIF data extraction
      setMockExif({
        Make: "Simulated Camera Inc.",
        Model: "PixelMaster Pro",
        DateTime: new Date(file.lastModified - (Math.random() * 100000000)).toLocaleString(),
        ISOSpeedRatings: Math.floor(Math.random() * 800) + 100,
        FNumber: `f/${(Math.random() * 5 + 1).toFixed(1)}`,
        ExposureTime: `1/${Math.floor(Math.random() * 200) + 50} sec`,
        "GPSLatitude": "N 34° 2' 33.22\"", // Simulated
        "GPSLongitude": "W 118° 12' 15.00\"" // Simulated
      });
    } else {
      setSelectedFile(null);
      setImagePreview(null);
      setImageInfo(null);
      setMockExif(null);
    }
  }, []);

  return (
    <TerminalWindow title="image_meta_inspector.pl" initialCommand="perl ./img_inspect.pl --gui">
      <AnimatedText text="// Image Metadata Inspector (EXIF Viewer)" className={`text-2xl mb-4 ${TYPING_TEXT_CYAN_CLASS}`} speed={30} />
      <p className="text-sm text-gray-400 mb-6">Upload an image to view its basic information and simulated EXIF data. This tool is inspired by steganography concepts of hidden data.</p>

      <div className="mb-6">
        <label htmlFor="imageUpload" className="block mb-1 text-sm font-medium text-green-300">Upload Image:</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          className={`${INPUT_CLASSES} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-black hover:file:bg-green-700`}
        />
      </div>

      {error && (
        <div className="my-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md">
          <p>{error}</p>
        </div>
      )}

      {selectedFile && imageInfo && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg border border-green-600 shadow-lg" />
            )}
          </div>
          <div className="space-y-4">
            <Section title="File_Information" titleClassName="text-xl text-cyan-300">
              <ul className="space-y-1 text-sm">
                <li><strong>Name:</strong> {imageInfo.name}</li>
                <li><strong>Type:</strong> {imageInfo.type}</li>
                <li><strong>Size:</strong> {imageInfo.size}</li>
                {imageInfo.dimensions && <li><strong>Dimensions:</strong> {imageInfo.dimensions}</li>}
                {imageInfo.lastModified && <li><strong>Last Modified:</strong> {imageInfo.lastModified}</li>}
              </ul>
            </Section>
            
            {mockExif && (
              <Section title="Simulated_EXIF_Data" titleClassName="text-xl text-cyan-300">
                <ul className="space-y-1 text-sm">
                  {Object.entries(mockExif).map(([key, value]) => (
                    <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4">Note: EXIF data is simulated for demonstration.</p>
              </Section>
            )}
          </div>
        </div>
      )}
       {!selectedFile && <p className="text-center text-gray-500 py-8">Awaiting image selection...</p>}
    </TerminalWindow>
  );
};

export default ImageExifPage;