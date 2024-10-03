import { Fragment, useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { FileRejection, useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

export interface FileUploadProps {
  file?: File | string | null;
  setFile: (value: File | string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {});
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const errorFile = fileRejections[0].errors;
        const errMessage = new Set<string>();
        for (let i = 0; i < errorFile.length; i++) {
          if (errorFile[i].code === "file-invalid-type") {
            errMessage.add("Only .jpg, .jpeg, and .png are supported");
          }

          // if (errorFile[i].code === "file-too-large") {
          //   errMessage.add("Max image size is 5MB");
          // }
        }

        setError(Array.from(errMessage));
        return;
      }

      if (acceptedFiles.length > 0) {
        if (acceptedFiles[0]) {
          const file = acceptedFiles[0];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("file_name", file.name);

          try {
            const response = await axios.post("api/media/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            setFile(response.data?.uploadedFile?.url);
          } catch (error) {
            setError(["File gagal di upload"]);
          }
        }
      }
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
      "video/*": [".mp4"],
    },
    noClick: true,
    maxFiles: 1,
    // maxSize: 5000000,
  });
  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className="flex justify-center items-center w-full  p-10 border-[1.5px] border-[#9EA2AD] rounded-lg"
      >
        <Input {...getInputProps()} />
        <div
          onClick={() => open()}
          className={cn(
            "cursor-pointer w-full flex-col min-h-[200px] transition-all flex justify-center border-[#C9C9C9] rounded-lg items-center border-dashed border gap-2",
            isDragActive && "border-[2px] border-[#9EA2AD]"
          )}
        >
          <Upload className="size-9 text-black" />
          {error.length > 0 &&
            error.map((e, i) => (
              <p key={i} className="text-[#DC2522] font-lexend text-sm">
                {e}
              </p>
            ))}
          {file && (
            <Fragment>
              {file instanceof File ? (
                <p className="text-black font-lexend text-sm">{file.name}</p>
              ) : (
                <Link
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline"
                >
                  {file}
                </Link>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
