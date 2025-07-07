import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const socket: Socket = io(import.meta.env.VITE_REACT_APP_ENDPOINT, { autoConnect: false });

export default socket;