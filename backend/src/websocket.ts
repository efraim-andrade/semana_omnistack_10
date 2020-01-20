import socketio from 'socket.io'
import { Application } from 'express'

import { parseStringAsArray, getDistanceFromLatLonInKm } from './functions'

type CoordinatesTypes = {
  latitude: number,
  longitude: number
}

interface ConnectionsType {
  id: string;
  coordinates: CoordinatesTypes;
  techs: string[]
}

const connections: ConnectionsType[] = []
let io

const setupWebsocket = (server: Application): void => {
  io = socketio(server)

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    })
  })
}

const findConnections = (coordinates: CoordinatesTypes, techs: string[]): ConnectionsType[] => {
  return connections.filter(connection => getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10 && connection.techs.some((item: string) => techs.includes(item)))
}

const sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emmit(message, data)
  })
}

export { setupWebsocket, findConnections, sendMessage }
