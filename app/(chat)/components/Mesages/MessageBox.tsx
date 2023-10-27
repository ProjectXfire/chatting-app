'use client';

import { format } from 'date-fns';
import NextImage from 'next/image';
import styles from './Messages.module.css';
import { type IMessage } from '../../interfaces';
import { Avatar } from '@/shared/components';
import { Typography } from '@mui/material';

type TPos = 'right' | 'left';

interface Props {
  pos?: TPos;
  message: IMessage;
  isLast: boolean;
  sessionId: string;
}

function MessageBox({ message, pos = 'left', isLast, sessionId }: Props): JSX.Element {
  const isRight = pos === 'right';
  const isText = typeof message.body === 'string';

  return (
    <div className={`${styles['message-container']} ${isRight ? styles['message-right'] : ''}`}>
      <div className={`${styles.message} ${isRight ? styles['avatar-right'] : ''}`}>
        <Avatar imagePath={message.sender?.image} noActiveIcon />
        <div className={styles['message-text']}>
          <Typography sx={{ alignSelf: isRight ? 'flex-end' : 'flex-start' }} variant='body2'>
            <strong className={styles['message-sender']}>{message.sender?.name}</strong>{' '}
            <span className={styles['message-time']}>
              {format(new Date(message.createdAt), 'p')}
            </span>
          </Typography>
          {isText ? (
            <Typography
              sx={{
                py: '5px',
                px: 2,
                backgroundColor: pos === 'right' ? 'secondary.main' : 'primary.main',
                borderRadius: 5
              }}
              variant='body2'
            >
              {message.body}
            </Typography>
          ) : (
            <div className={styles['message-image']}>
              <NextImage
                fill
                sizes='(max-width: 768px) 100vw, 300px'
                src={message.image ?? ''}
                alt='message'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MessageBox;
