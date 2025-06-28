export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file); // This outputs the full Base64 Data URL
    });
  };

  export async function resizeImage(file: File, maxSize = 512): Promise<File> {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.onload = () => {
          const scale = maxSize / Math.max(img.width, img.height);
          const width = img.width * scale;
          const height = img.height * scale;
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob((blob) => {
            resolve(new File([blob!], file.name, { type: "image/jpeg" }));
          }, "image/jpeg");
        };
        img.src = e.target?.result as string;
      };
  
      reader.readAsDataURL(file);
    });
  }
  