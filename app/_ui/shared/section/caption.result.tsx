"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn/button";
import { CheckIcon, CopyIcon, LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaptionResultProps {
  caption: string | null;
  isGenerating: boolean;
}

export const CaptionResult = ({
  caption,
  isGenerating,
}: CaptionResultProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (!caption) return;

    try {
      await navigator.clipboard.writeText(caption);
      setIsCopied(true);

      toast({
        title: "Copied to clipboard",
        description: "The caption has been copied to your clipboard",
      });

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-md font-medium">Generated Caption</h3>

      <div className="bg-muted rounded-lg p-4 min-h-[80px] flex items-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center w-full gap-2 text-muted-foreground"
            >
              <LoaderCircle className="h-4 w-4 animate-spin" />
              <span>Generating caption...</span>
            </motion.div>
          ) : caption ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <p className="text-sm md:text-base font-medium">{caption}</p>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={copyToClipboard}
              >
                {isCopied ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground text-center w-full"
            >
              <p className="text-sm">Caption will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
