import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

interface FileUploaderProps {
  path: string | undefined;
  setPath: (value?: string) => void;
}

const FileUploader = ({ setPath }: FileUploaderProps) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Prepare FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", file.name);

      // API Call with Axios
      try {
        const response = await axios.post("api/media/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response);
        setIsUploaded(true); // Set uploaded state to true
        setPath(response.data?.uploadedFile?.url);
        toast({
          variant: "default",
          title: "success upload docs",
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          variant: "destructive",
          title: "Fail to upload docs",
        });
      }
    }
  };

  return (
    <div className="sm:col-span-10">
      <label
        htmlFor="report"
        className="flex items-center justify-center w-full h-30 p-4 border rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200"
        style={{ border: "2px dashed #C9C9C9" }}
      >
        {isUploaded ? (
          <Image
            src="/upload-success.png" // Change to your success icon
            alt="Uploaded"
            width={500}
            height={500}
            className="mr-2 w-6 h-6"
          />
        ) : (
          <Image
            src="/upload.png"
            alt="Upload"
            width={500}
            height={500}
            className="mr-2 w-6 h-6"
          />
        )}
        <span className="text-gray-700">
          {isUploaded ? "File Uploaded" : "Upload File"}
        </span>
      </label>

      <input
        type="file"
        id="report"
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf, .doc, .docx"
      />
      {uploadError && (
        <p className="mt-2 text-sm text-red-400">{uploadError}</p>
      )}
    </div>
  );
};

export default FileUploader;
