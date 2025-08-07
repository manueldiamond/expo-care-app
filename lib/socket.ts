import { BASE_BACKEND_URL } from '@/utils/api';
import { io, Socket } from 'socket.io-client';

export function createNotificationSocket(userId: string): Socket {
  // Remove '/api' from BASE_BACKEND_URL
  const socketUrl = BASE_BACKEND_URL.replace(/\/api$/, '');
  console.log('CONNECTING TO SOCKET',socketUrl)
  return io(socketUrl, {
    query: { userId },
    transports: ['websocket'],
  });
}

// Create a global socket instance for chat
const socketUrl = BASE_BACKEND_URL.replace(/\/api$/, '');
export const socket = io(socketUrl, {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;
