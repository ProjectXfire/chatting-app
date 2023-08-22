'use client';

import { useRef, useState } from 'react';
import NextImage from 'next/image';
import styles from './UploadImage.module.css';
import { Button } from '@mui/material';
import { uploadImageFile } from '@/shared/helpers';
import toast from 'react-hot-toast';

interface Props {
  onSave: (imageFileRef: File) => void;
  onClose: () => void;
}

function UploadImage({ onSave, onClose }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPrevieImage] = useState<string | null>(null);
  const imageFileRef = useRef<File | null>(null);

  const onDropImage = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const images = e.dataTransfer.files;
    if (images === null) return;
    uploadImageFile(images)
      .then((data) => {
        setPrevieImage(data[0]);
        imageFileRef.current = images[0];
      })
      .catch(() => {
        toast.error('Error on load image in preview');
      });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onBrowserImage = (): void => {
    if (inputRef.current !== null) inputRef.current.click();
  };

  const selectedImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const images = e.target.files;
    if (images === null) return;
    uploadImageFile(images)
      .then((data) => {
        setPrevieImage(data[0]);
        imageFileRef.current = images[0];
      })
      .catch(() => {
        toast.error('Error on load image in preview');
      });
  };

  const onSend = (): void => {
    if (imageFileRef.current !== null) onSave(imageFileRef.current);
  };

  return (
    <div className={styles['upload-image']}>
      <div
        className={styles['upload-image__box']}
        onDrop={onDropImage}
        onDragOver={handleDragOver}
        onClick={onBrowserImage}
      >
        {previewImage === null ? (
          <p>Select or drop an image</p>
        ) : (
          <NextImage
            className={styles['preview-image']}
            width={220}
            height={220}
            src={previewImage}
            alt='preview'
          />
        )}
      </div>
      <input
        className={styles['hide-input']}
        ref={inputRef}
        type='file'
        accept='image/*'
        min={1}
        onChange={selectedImage}
      />
      <div className={styles['upload-image__actions']}>
        <Button type='button' variant='contained' onClick={onSend}>
          Send
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default UploadImage;
