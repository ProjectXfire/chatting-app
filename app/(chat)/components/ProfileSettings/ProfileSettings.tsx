'use client';

import { useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import styles from './ProfileSettings.module.css';
import { type IUser } from '../../interfaces';
import { updateUser } from '../../services';
import { useModal } from '@/shared/states';
import { uploadImageFile } from '@/shared/helpers';
import { Close } from '@mui/icons-material';
import { Button, Divider, Fab, TextField, Typography } from '@mui/material';
import { Avatar } from '@/shared/components';

interface Props {
  session: IUser;
}

function ProfileSettings({ session }: Props): JSX.Element {
  const { close } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPrevieImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const imageFileRef = useRef<File | null>(null);
  const currentName = useRef<string | null | undefined>(session.name);

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

  const onSubmit = async (values: { name: string }): Promise<void> => {
    const { name } = values;
    if (currentName.current === name && imageFileRef.current === null) {
      toast.success('Nothing to update');
      close();
      return;
    }
    setLoading(true);
    const { successfulMessage, errorMessage } = await updateUser(session.id, {
      name,
      image: imageFileRef.current,
      imageCode: session.imageCode
    });
    if (successfulMessage !== null) {
      toast.success(successfulMessage);
      close();
    } else {
      toast.success(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className={styles['profile-settings']}>
      <div className={styles['profile-settings-close']}>
        <Fab
          size='small'
          color='secondary'
          onClick={() => {
            if (!loading) close();
          }}
        >
          <Close />
        </Fab>
      </div>
      <header>
        <Typography variant='h5'>Profile</Typography>
        <Typography sx={{ color: 'var(--info)' }}>Edit your public information</Typography>
      </header>
      <Formik initialValues={{ name: session.name ?? '' }} onSubmit={onSubmit}>
        {({ getFieldProps, handleSubmit }) => (
          <Form className={styles['profile-settings__form']} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              {...getFieldProps('name')}
              label='Name'
              variant='outlined'
              disabled={loading}
            />
            <div>
              <Typography sx={{ mb: 1 }}>Photo</Typography>
              <div className={styles['profile-input-photo']}>
                <Avatar imagePath={previewImage ?? session.image} noActiveIcon />
                <Button size='small' variant='text' disabled={loading} onClick={onBrowserImage}>
                  Change
                </Button>
                <input
                  className={styles['hide-input']}
                  ref={inputRef}
                  type='file'
                  accept='image/*'
                  min={1}
                  onChange={selectedImage}
                />
              </div>
            </div>
            <Divider />
            <div className={styles['profile-settings__actions']}>
              <Button type='button' variant='outlined' disabled={loading} onClick={close}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' disabled={loading}>
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default ProfileSettings;
