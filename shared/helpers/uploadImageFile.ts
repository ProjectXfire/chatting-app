// eslint-disable-next-line @typescript-eslint/promise-function-async
export const uploadImageFile = (fileList: FileList): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const imagePromises: Array<Promise<string>> = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        imagePromises.push(
          // eslint-disable-next-line promise/param-names
          new Promise((resolveImage, rejectImage) => {
            reader.onload = () => {
              if (reader.result !== null && typeof reader.result === 'string') {
                resolveImage(reader.result);
              } else {
                rejectImage(new Error(`Error reading image: ${file.name}`));
              }
            };
            reader.onerror = () => {
              rejectImage(new Error(`Error reading image: ${file.name}`));
            };
            reader.readAsDataURL(file);
          })
        );
      } else {
        reject(new Error(`File ${file.name} is not an image.`));
        return;
      }
    }
    Promise.all(imagePromises)
      .then((base64Images) => {
        resolve(base64Images);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
