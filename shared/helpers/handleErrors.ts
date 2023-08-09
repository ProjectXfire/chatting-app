import axios from 'axios';

export const handleErrorMessage = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response === undefined) return 'Something get wrong!';
    return error.response.data.errorMessage;
  }
  return error.message;
};
