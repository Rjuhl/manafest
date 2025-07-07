import socket from "@util/socket";

export function emitWithAck<T = any>(
  event: string,
  data: any,
  timeout: number = 5000
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    socket.timeout(timeout).emit(event, data, (err: Error | null, response: T) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}


// const handleSubmit = async () => {
//   try {
//     const response = await emitWithAck(socket, 'join-game', { code: 'XYZ123' });
//     console.log('Server response:', response);
//   } catch (err) {
//     console.error('Socket timeout or error:', err);
//   }
// };

// socket.on('join-game', (data, callback) => {
//   if (isValidGameCode(data.code)) {
//     callback({ success: true, message: 'Joined!' });
//   } else {
//     callback({ success: false, message: 'Invalid code' });
//   }
// });