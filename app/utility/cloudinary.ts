"use server";

import { cloudinary } from "@/lib/cloudinary";
import axios from "axios";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

type UploadResponse = {
  success: boolean;
  result?: UploadApiResponse;
  error?: UploadApiErrorResponse;
};

export const uploadImage = async ({ formData }: { formData: FormData }) => {
  const file: File = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const encoding = "base64";
  const base64data = Buffer.from(arrayBuffer).toString("base64");
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64data;
  try {
    const res = await cloudinaryUpload({ fileUri, fileName: file.name });
    if (res.success) {
      return { success: true, url: res.result?.url };
    } else {
      return { success: false, message: res.error };
    }
  } catch (error) {
    return { success: false, message: error };
  }
};

const cloudinaryUpload = async ({
  fileUri,
  fileName,
}: {
  fileUri: string;
  fileName: string;
}): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        use_filename: true,
      })
      .then((value) => {
        resolve({ success: true, result: value });
      })
      .catch((value) => {
        reject({ success: false, error: value });
      });
  });
};
