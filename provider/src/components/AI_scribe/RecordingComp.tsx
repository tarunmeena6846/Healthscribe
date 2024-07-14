import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    setJobId("");
    setIsLoading(true);
    setUploadComplete(false);
    formData.append("audio", file as Blob);
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/data/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setAnalysisResult(response.data.data);
      setIsLoading(false);
      setUploadComplete(true);
    } catch (error) {
      console.error("Error uploading video:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        Upload Video
      </button>
      {isLoading && (
        <div className="mt-4">
          <div className="flex justify-center items-center space-x-2 animate-pulse">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          </div>
          <p className="text-center mt-2">Processing...</p>
        </div>
      )}
      {uploadComplete && analysisResult && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Analysis Result:</h3>
          {analysisResult.map((section: any, index: number) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold">{section.SectionName}</h4>
              <ul className="list-disc list-inside">
                {section.Summary.map((item: any, idx: number) => (
                  <p key={idx}>{item.SummarizedSegment}</p>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
