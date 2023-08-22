'use client';

import { Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import styles from './Messages.module.css';
import { createMessage, uploadImage } from '../../services';
import { MessageSchema } from '../../schemas';
import { useModal } from '@/shared/states';
import { Photo, Send } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { UploadImage } from '..';

interface Props {
  conversationId: string;
  userId: string;
}

function MessageInput({ conversationId, userId }: Props): JSX.Element {
  const { open, setComponent, close } = useModal();

  const onSubmitMessage = async (message: string): Promise<void> => {
    const { successfulMessage } = await createMessage(conversationId, userId, { message });
    if (successfulMessage === null) toast.error('Could not send the message');
  };

  const onSubmitImage = async (payload: File): Promise<void> => {
    const { data, errorMessage } = await uploadImage(payload);
    if (data === null) {
      toast.error(errorMessage);
      return;
    }
    const { successfulMessage } = await createMessage(conversationId, userId, {
      image: data.secure_url
    });
    if (successfulMessage === null) toast.error('Could not send the message');
    close();
  };

  const onUploadImage = (): void => {
    open();
    setComponent(
      <UploadImage
        onSave={(data) => {
          void onSubmitImage(data);
        }}
        onClose={close}
      />
    );
  };

  return (
    <section className={styles['message-form-container']}>
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(value, { resetForm }) => {
          void onSubmitMessage(value.message);
          resetForm();
        }}
        validationSchema={MessageSchema}
      >
        {({ handleSubmit, getFieldProps }) => (
          <Form className={styles['message-form']} onSubmit={handleSubmit}>
            <IconButton type='button' onClick={onUploadImage}>
              <Photo sx={{ color: 'var(--background)' }} />
            </IconButton>
            <input
              className={styles['message-input']}
              {...getFieldProps('message')}
              type='text'
              placeholder='Write a message'
            />
            <IconButton type='submit'>
              <Send sx={{ color: 'var(--background)' }} />
            </IconButton>
          </Form>
        )}
      </Formik>
    </section>
  );
}
export default MessageInput;
