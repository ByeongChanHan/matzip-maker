import { useState } from "react";
import Image from "next/image";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: "1px solid black", padding: "1rem" }}
    >
      {files.length > 0 && (
        <>
          {files.map((file) => (
            <div key={file.name}>
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={100}
                height={100}
              />
            </div>
          ))}
        </>
      )}
      {files.length === 0 && <p>파일을 업로드하세요</p>}
    </div>
  );
};

export default FileUploader;
