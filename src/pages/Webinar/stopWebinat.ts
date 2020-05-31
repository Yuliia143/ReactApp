export const stopWebinar = (socket: any) => {
  const video = document.querySelector('#local-video') as HTMLVideoElement;
  const stream = video.srcObject as MediaStream;
  stream.getTracks().forEach((track) => track.stop());
  socket.emit('stop_webinar', '');
  window.location.reload();
};

export const leavePage = (socket: any) => {
  const video = document.querySelector('#local-video') as HTMLVideoElement;
  const stream = video.srcObject as MediaStream;
  stream.getTracks().forEach((track) => track.stop());
  socket.emit('stop_webinar', '');
};
