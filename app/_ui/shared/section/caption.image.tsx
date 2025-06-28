"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { LoaderCircle, Upload } from "lucide-react";
import { useCaptionGenerator } from "@/hooks/useCaptionGenerator";
import { ICaptionHistory } from "@/lib/models";
import { ImageDropzone } from "./caption.image.dropzone";
import { CaptionResult } from "./caption.result";
import { CaptionHistory } from "./caption.history";

export const SectionCaptionImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<ICaptionHistory[]>([]);

  const { toast } = useToast();
  const { caption, loading, generateCaption: Generate } = useCaptionGenerator();

  const handleImageUpload = (file: File) => {
    setImage(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleGenerateCaption = async () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    Generate(image);

    if (imageUrl) {
      const newCaption: ICaptionHistory = {
        id: Date.now().toString(),
        imageUrl,
        caption,
        timestamp: new Date(),
      };

      setHistory((prev) => [newCaption, ...prev]);
    }
  };

  const clearImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImage(null);
    setImageUrl(null);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full overflow-hidden transition-all">
        <CardHeader>
          <CardTitle>Upload Your Image</CardTitle>
          <CardDescription>
            Upload an image to generate an AI caption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!imageUrl ? (
            <ImageDropzone onImageUpload={handleImageUpload} />
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
              <Image
                src={imageUrl}
                alt="Uploaded image"
                className="object-contain max-h-[400px] w-auto"
                width={600}
                height={400}
                priority
              />
            </div>
          )}

          {imageUrl && (
            <CaptionResult caption={caption} isGenerating={loading} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2">
          {imageUrl && (
            <Button variant="outline" onClick={clearImage}>
              Clear Image
            </Button>
          )}
          <Button
            onClick={handleGenerateCaption}
            disabled={!image || loading}
            className="ml-auto"
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Generate Caption
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {history.length > 0 && (
        <CaptionHistory history={history} onClear={() => setHistory([])} />
      )}
    </div>
  );
};
