'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import styles from './CreateConversation.module.css';
import { type IUser } from '../../interfaces';
import { getUsers, startOrCreateConversation } from '../../services';
import { ConversationSchema } from '../../schemas';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { useModal } from '@/shared/states';
import toast from 'react-hot-toast';

interface Props {
  user: IUser;
}

function CreateConversation({ user }: Props): JSX.Element {
  const [people, setPeople] = useState<IUser[]>([]);
  const router = useRouter();
  const { close } = useModal();

  const onGetUsers = async (): Promise<void> => {
    const users = await getUsers(user.id);
    setPeople(users);
  };

  const onSubmit = async ({ name, ids }: { name: string; ids: string[] }): Promise<void> => {
    const { data, successfulMessage, errorMessage } = await startOrCreateConversation({
      name,
      members: ids,
      isGroup: true,
      sessionId: user.id
    });
    if (successfulMessage !== null && data !== null) {
      toast.success(successfulMessage);
      router.push(`/conversations?id=${data?.id}`);
      router.refresh();
      close();
    } else {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    void onGetUsers();
  }, []);

  return (
    <div className={styles['create-conversation']}>
      <div className={styles['create-conversation__header']}>
        <Typography variant='body1' fontWeight='bold'>
          Create a group chat
        </Typography>
        <Typography color='var(--info)' variant='body2'>
          Create a chat with at least 2 people
        </Typography>
      </div>
      <Formik
        initialValues={{ name: '', ids: [] }}
        validationSchema={ConversationSchema}
        onSubmit={onSubmit}
      >
        {({ getFieldProps, handleSubmit, errors, touched }) => (
          <Form className={styles['create-conversation__form']} onSubmit={handleSubmit}>
            <div className={styles['create-conversation__inputs']}>
              <TextField
                {...getFieldProps('name')}
                size='medium'
                label='Name'
                variant='outlined'
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={Boolean(errors.name) && Boolean(touched.name) && errors.name}
              />
              <FormControl>
                <InputLabel>Members</InputLabel>
                <Select
                  {...getFieldProps('ids')}
                  error={Boolean(errors.ids) && Boolean(touched.ids)}
                  size='medium'
                  multiple
                  input={<OutlinedInput label='Members' />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={people.find((u) => u.id === value)?.name} />
                      ))}
                    </Box>
                  )}
                >
                  {people.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Divider />
            <div className={styles['create-conversation__actions']}>
              <Button type='button' variant='outlined' onClick={close}>
                Cancel
              </Button>
              <Button type='submit' variant='contained'>
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default CreateConversation;
