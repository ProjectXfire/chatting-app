'use client';

import NextImage from 'next/image';
import { type IUser } from '@/app/(chat)/interfaces';
import styles from './Avatar.module.css';
import { Avatar as MuiAvatar } from '@mui/material';

interface Props {
  imagePath?: string | null;
  isActive?: boolean;
  noActiveIcon?: boolean;
  multipleImage?: IUser[];
}

function Avatar({ imagePath, isActive, noActiveIcon = false, multipleImage }: Props): JSX.Element {
  if (imagePath !== undefined && imagePath !== null)
    return (
      <div className={styles.avatar}>
        <MuiAvatar src={imagePath} alt='avatar' />
        {!noActiveIcon && <span className={styles.active} />}
      </div>
    );

  if (multipleImage !== undefined && multipleImage.length > 2) {
    const images = multipleImage.map((u) => u.image).slice(0, 3);
    const imagesComponents = images.map((img, i) => {
      if (typeof img === 'string')
        return (
          <NextImage
            style={{ borderRadius: '50%' }}
            key={i}
            src={img}
            width={22}
            height={22}
            alt='avatar'
          />
        );
      return (
        <NextImage
          style={{ borderRadius: '50%' }}
          key={i}
          src='/images/placeholder.jpg'
          width={22}
          height={22}
          alt='avatar'
        />
      );
    });
    return (
      <div className={styles['avatar-group']}>
        <div>{imagesComponents[0]}</div>
        <div>
          {imagesComponents[1]}
          {imagesComponents[2]}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.avatar}>
      <MuiAvatar src='/images/placeholder.jpg' alt='avatar' />
      {!noActiveIcon && <span className={styles.active} />}
    </div>
  );
}
export default Avatar;
