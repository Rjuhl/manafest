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
