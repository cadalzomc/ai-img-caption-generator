import { Client } from "@gradio/client";
import { EnumResponseCode, IPayloadCaption, IResponse } from "../models";

export const GenerateCaption = async (
  payload: IPayloadCaption
): Promise<IResponse<string>> => {
  try {
    const base64WithHeader = payload.base64?.startsWith("data:")
      ? payload.base64
      : `data:image/jpeg;base64,${payload.base64}`;

    const res = await fetch(base64WithHeader ?? "");
    const imageBlob = await res.blob();

    const client = await Client.connect("meigo07/blip-captioning-api");
    const result = await client.predict("/predict", {
      image: imageBlob,
    });

    const caption = (result.data as string[])[0] || "No caption generated.";

    return {
      code: EnumResponseCode.Success,
      message: "Caption AI Received",
      data: caption,
    };
  } catch (error) {
    console.error("Error generating caption:", error);
    return {
      code: EnumResponseCode.Error,
      message: "Failed to generate caption. Please try again.",
    };
  }
};
