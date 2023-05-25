import { type ImageSize } from "../src/types";

function calculateAspectRatio(
  originalWidth: number,
  originalHeight: number,
  desiredWidth: number
): number {
  const aspectRatio = originalWidth / originalHeight;
  const desiredHeight = Math.round(desiredWidth / aspectRatio);
  return desiredHeight;
}

const getMeta = async (url: string): Promise<any> =>
  await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });

// Function that returns the image size
export const getImageSize = async (
  url: string,
  desiredsize: number
): Promise<ImageSize> => {
  const img = await getMeta(url);
  const { width, height } = img;
  if (width >= height) {
    const newHeight = calculateAspectRatio(width, height, desiredsize);
    return { width: desiredsize, height: newHeight };
  } else {
    const newWidth = calculateAspectRatio(height, width, desiredsize);
    return { width: newWidth, height: desiredsize };
  }
};
