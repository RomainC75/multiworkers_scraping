import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '../@types/socket'

const URL = process.env.REACT_APP_SOCKET

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL?URL:"http://localhost:5000", {
   path: '/socket.io',
   reconnection: true,
})

export default socket
