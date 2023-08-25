'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import styles from './AddMembers.module.css';
import { type IUser } from '../../interfaces';
import { AddMembersToConversation, getUsers } from '../../services';
import { useModal } from '@/shared/states';
import { AddMembersSchema } from '../../schemas';
import {
  Box,
  Button,
  Chip,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface Props {
  sessionId: string;
  conversationId: string;
}

function AddMembers({ sessionId, conversationId }: Props): JSX.Element {
  const { close } = useModal();
  const [people, setPeople] = useState<IUser[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onGetUsers = async (): Promise<void> => {
    const users = await getUsers(sessionId);
    setPeople(users);
  };

  const onSubmit = async ({ ids }: { ids: string[] }): Promise<void> => {
    setLoading(true);
    const { successfulMessage, errorMessage } = await AddMembersToConversation(conversationId, ids);
    if (successfulMessage !== null) {
      toast.success(successfulMessage);
      close();
      router.refresh();
    } else {
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    void onGetUsers();
  }, []);

  return (
    <div className={styles['add-members']}>
      <div className={styles['add-members__close']}>
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
      <Typography sx={{ mb: 2 }} variant='h5'>
        Select new members
      </Typography>
      <Formik initialValues={{ ids: [] }} validationSchema={AddMembersSchema} onSubmit={onSubmit}>
        {({ getFieldProps, handleSubmit, errors, touched }) => (
          <Form className={styles['add-members__form']} onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel>Members</InputLabel>
              <Select
                {...getFieldProps('ids')}
                fullWidth
                size='medium'
                multiple
                disabled={loading}
                error={Boolean(errors.ids) && Boolean(touched.ids)}
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
            <Divider />
            <div className={styles['add-members__actions']}>
              <Button type='button' variant='outlined' disabled={loading} onClick={close}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' disabled={loading}>
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AddMembers;
