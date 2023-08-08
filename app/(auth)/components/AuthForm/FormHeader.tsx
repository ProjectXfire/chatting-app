import NextImage from 'next/image';
import { Typography } from '@mui/material';
import styles from './AuthForm.module.css';

interface Props {
  imageUrl: string;
  title: string;
}

function FormHeader({ imageUrl, title }: Props): JSX.Element {
  return (
    <header className={styles['auth-header']}>
      <NextImage width={50} height={50} src={imageUrl} alt='image' />
      <Typography variant='h5' textAlign='center'>
        {title}
      </Typography>
    </header>
  );
}
export default FormHeader;
