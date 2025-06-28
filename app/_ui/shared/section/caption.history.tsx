"use client";

import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/shadcn/button";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { HistoryIcon, TrashIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ICaptionHistory } from "@/lib/models";

interface CaptionHistoryProps {
  history: ICaptionHistory[];
  onClear: () => void;
}

export function CaptionHistory({ history, onClear }: CaptionHistoryProps) {
  if (history.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col space-y-1">
          <CardTitle className="flex items-center">
            <HistoryIcon className="h-4 w-4 mr-2" />
            Caption History
          </CardTitle>
          <CardDescription>
            Your recent captions from this session
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-muted-foreground"
          onClick={onClear}
        >
          <TrashIcon className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index === 0 ? 0.1 : 0,
                }}
              >
                <div className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded overflow-hidden bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.caption}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.caption}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                {index < history.length - 1 && <Separator className="my-4" />}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
