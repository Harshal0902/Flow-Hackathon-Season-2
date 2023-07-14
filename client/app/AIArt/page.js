"use client"

import { useState } from 'react';

function AIArt() {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: inputValue }),
    });

    if (response.ok) {
      const data = await response.json();
      setImageUrl(data[0]);
    } else {
      console.error('Error:', response.statusText);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (imageUrl) {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'generated_image.png';
          link.click();
          URL.revokeObjectURL(url);
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <div>
      <div>
        <div className="grid place-items-center">
          <h1 className="text-6xl text-white text-center">AI Assets Generator</h1>
          <div className="bg-secondary w-96 h-1 my-2 rounded-md"></div>
        </div>

        <form className="flex items-center justify-center my-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Type here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none"
          >
            Generate
          </button>
        </form>
      </div>
      {loading && <div className="text-center py-12 text-gray-200">Loading...</div>}

      {imageUrl && !loading && (
        <div className="my-12 grid place-items-center">
          <img src={imageUrl} alt="Generated image" className="rounded-xl shadow-lg" />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4 focus:outline-none"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}

export default AIArt;