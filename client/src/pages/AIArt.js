import React, { useState } from "react";

const API_TOKEN = process.env.REACT_APP_API_KEY;

const AIArtGenerator = () => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const input = event.target.elements.input.value;
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify({ inputs: input }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to generate image");
        }

        const blob = await response.blob();
        setOutput(URL.createObjectURL(blob));
        setLoading(false);
    };

    const handleDownload = () => {
        if (output) {
            const link = document.createElement("a");
            link.href = output;
            link.download = "generated_image.png";
            link.click();
        }
    };

    return (
        <div>
            <div className="grid place-items-center">
                <h1 className='text-6xl text-white text-center'>AI Assets Generator</h1>
                <div className="bg-secondary w-96 h-1 my-2 rounded-md"></div>
            </div>

            <form className="flex items-center justify-center my-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="input"
                    placeholder="Type here..."
                    className="border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none"
                >
                    Generate
                </button>
            </form>
            <div className="my-4 grid place-items-center">
                {loading && <div className="text-gray-200">Loading...</div>}
                {!loading && output && (
                    <div className="grid place-items-center">
                        <img src={output} alt="Generated Art" className="rounded-lg shadow-lg" />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4 focus:outline-none"
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIArtGenerator;
