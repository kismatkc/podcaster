import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PodcastThumbnail = () => {
  const [imageUrl, setImageUrl] = useState("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const image = acceptedFiles[0];
    console.log(image);
    
    const url = URL.createObjectURL(image);
    setImageUrl(url);
  }, []);
  const buttonRef = useRef<HTMLInputElement>(null);
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      noClick: true,
      multiple: false,
      accept: {
        "image/*": [],
      },
    });
  return (
    <div className="flex flex-col gap-2.5">


      <div
        {...getRootProps()}
        className={cn(
          "border-[2px] border-dashed border-[#ccc] p-10 text-center bg-slate- text-white-1",
          {
            "bg-green-700": isDragActive,
            "bg-red-700": isDragReject,
          }
        )}
      >
        <Input {...getInputProps()} ref={buttonRef} />
        <div className="flex flex-col items-center">
          <Image
            src="/icons/cloud-upload.svg"
            alt="upload photo"
            width={30}
            height={30}
          />
          <p className="mb-4">
            {isDragReject
              ? "Please only upload IMG files"
              : " Drop the image here"}
          </p>

          <div
            className={cn(
              "flex flex-col opacity-100 transition-all duration-150",
              {
                "opacity-0": isDragActive,
              }
            )}
          >
            <span>OR</span>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (buttonRef.current) {
                  buttonRef.current.click();
                }
              }}
              className="hover:scale-105 mt-4 transition-all"
              disabled={isDragActive}
            >
              Choose
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center ">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Podcast thumnail"
            className="w-[400px] h-[400px] object-contain "
          />
        )}
      </div>
    </div>
  );
};

export default PodcastThumbnail;
