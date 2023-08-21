"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { Trash2Icon } from "lucide-react";

const ImageUpload = ({ value, onChange, onRemove }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };
  if (!mounted) {
    return;
  }
  return (
    <div className="flex items-center w-full p-5">
      <div className="relative">
        {!value ? (
          <CldUploadWidget
            onUpload={onUpload}
            uploadPreset="xdhynap3"
            className="h-full"
          >
            {({ open }) => {
              const onClick = () => {
                open();
              };
              return (
                <div
                  className={`relative w-[200px] h-[200px] overflow-hidden rounded-lg  cursor-pointer `}
                  onClick={onClick}
                >
                  <Image
                    src={value ? value : "/image.webp"}
                    fill
                    alt="dummy"
                    className="object-center rounded-lg bg-cover"
                  />
                </div>
              );
            }}
          </CldUploadWidget>
        ) : (
          <div
            className={`relative w-[200px] h-[200px] overflow-hidden rounded-lg  cursor-pointer `}
          >
            <Image
                src={value ? value : "/image.webp"}
              fill
              alt="dummy"
              className="object-center rounded-lg bg-cover"
            />
          </div>
        )}
        {value && (
          <div
            className="absolute top-2 right-2 bg-red-500 flex justify-center items-center rounded-md p-2 cursor-pointer"
            onClick={onRemove}
          >
            <Trash2Icon className="h-5 w-5 " />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
