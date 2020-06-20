const socketsOff = (socket: any) => {
  socket.off("update-user-list");
  socket.off("emove-user");
  socket.off("answer-made");
};

export const stopWebinar = (socket: any) => {
  const video = document.querySelector("#local-video") as HTMLVideoElement;
  const stream = video.srcObject as MediaStream;
  stream.getTracks().forEach((track) => track.stop());
  socket.emit("stop_webinar", "");
  socketsOff(socket);
  window.location.reload();
};

export const leavePage = (socket: any) => {
  const video = document.querySelector("#local-video") as HTMLVideoElement;
  const stream = video.srcObject as MediaStream;
  stream.getTracks().forEach((track) => track.stop());
  socket.emit("stop_webinar", "");
  socketsOff(socket);
};
