import { io } from 'socket.io-client'
const URL = process.env.REACT_APP_SOCKET

const socket = io(URL?URL:"http://localhost:5000", {
   path: '/socket.io',
   reconnection: true,
})

export default socket
