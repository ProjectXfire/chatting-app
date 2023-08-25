import Server from 'pusher';
import Client from 'pusher-js';

export const pusherServer = new Server({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: 'eu',
  useTLS: true
});

export const pusherClient = new Client(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '', {
  cluster: 'eu'
});
