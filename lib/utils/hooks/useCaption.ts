import { IPayloadCaption } from "@/lib/models";

export const useCaption = () => {
  const generateCaption = async (payload: IPayloadCaption): Promise<string> => {
    const formData = new FormData();
    formData.append("image", payload.image);

    const res = await fetch("/api/caption", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    return result;
  };

  return {
    generateCaption,
  };
};
