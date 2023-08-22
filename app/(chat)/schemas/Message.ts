import * as Yup from 'yup';

export const MessageSchema = Yup.object({
  message: Yup.string().required('Message is required')
});
