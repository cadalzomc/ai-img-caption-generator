import React from "react";
import { SectionCaptionImage } from "./_ui/shared/section";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              AI Image Caption Generator
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Upload your image and get AI-generated captions instantly
            </p>
          </header>
          <SectionCaptionImage />
        </div>
      </main>
    </>
  );
}
