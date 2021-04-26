export default function () {
  return {
    connectionStatus: 0, // 0 CONNECTING, 1 OPEN, 2 CLOSING, 3 CLOSED https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    maxLength: {
      message: 10500,
      roomName: 50,
      username: 50
    },
    pageSize: 15
  }
}
