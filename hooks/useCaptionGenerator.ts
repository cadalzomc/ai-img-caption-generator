import { IResponse } from "@/lib/models";
import { resizeImage } from "@/lib/utils/helper";
import { useState } from "react";

export const useCaptionGenerator = () => {
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const generateCaption = async (file: File) => {
    setLoading(true);
    setError("");
    setCaption("");

    try {
      const resizeImg = await resizeImage(file);

      const formData = new FormData();
      formData.append("image", resizeImg);
      formData.append("caption", caption);

      const res = await fetch("/api/caption", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const result: IResponse<string> = await res.json();

      setCaption(result.data ?? "");
    } catch (err) {
      console.error(err);
      setError("Failed to generate caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { caption, loading, error, generateCaption };
};
