// pages/api/caption.ts
import { GenerateCaption } from "@/lib/server/generate";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // ✅ works here
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { payload } = req.body;

  try {
    const result = await GenerateCaption(payload);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Caption generation error:", error);
    return res.status(500).json({ error: "Failed to generate caption" });
  }
}
