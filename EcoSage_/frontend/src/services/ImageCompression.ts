/**
 * Compress an image before sending to AI models.
 * - Max dimension: 512px
 * - Format: JPEG
 * - Quality: 0.7
 * - Output: Base64 (data URL)
 */

export async function compressImage(
  base64: string,
  maxSize = 512,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Maintain aspect ratio
      if (width > height) {
        if (width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

      resolve(compressedBase64);
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    img.src = base64;
  });
}
