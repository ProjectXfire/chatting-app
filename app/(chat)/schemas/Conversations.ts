import * as Yup from 'yup';

export const ConversationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  ids: Yup.array().of(Yup.string()).min(2, 'Select at least 2 members')
});

export const AddMembersSchema = Yup.object({
  ids: Yup.array().of(Yup.string()).min(1, 'Select at least 1 member')
});
