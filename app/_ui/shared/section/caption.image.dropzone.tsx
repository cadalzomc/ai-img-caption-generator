/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/tw-merge";
import { Button } from "@/components/shadcn/button";
import { ImagePlus, UploadCloud } from "lucide-react";

interface ImageDropzoneProps {
  onImageUpload: (file: File) => void;
}

export const ImageDropzone = ({ onImageUpload }: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    if (files.length === 0) return;

    const file = files[0];

    // Check if the file is an image
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, WEBP)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    onImageUpload(file);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        "flex flex-col items-center justify-center gap-4",
        "min-h-[240px] cursor-pointer hover:bg-accent hover:border-primary/50",
        isDragging && "border-primary bg-accent"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-upload")?.click()}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
        <UploadCloud
          className={cn(
            "w-8 h-8 text-primary transition-transform duration-300",
            isDragging ? "scale-110" : "scale-100"
          )}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-lg">Drag & Drop your image here</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Support for JPEG, PNG, GIF, and WEBP (max 5MB)
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" variant="secondary" size="sm">
          <ImagePlus className="mr-2 h-4 w-4" />
          Select Image
        </Button>
      </div>

      <input
        id="file-upload"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
