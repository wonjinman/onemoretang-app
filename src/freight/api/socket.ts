import { Socket } from 'socket.io-client'
import { Freight } from '../domain/types'
import { Broker } from '../../common/domain/types'

export interface SearchDriverResponseBody {
	broker: Broker
	freight: Freight
	brokerId: number
	freightId: number
	driverSearchId: number
}

export interface StopSearchDriverBody {
	brokerId: number
	freightId: number
	matchedDriverId?: number
}

export interface NotificationBody {
	id: number
	type: string
	content: string
	createdAt: string
	updatedAt: string
}

export enum ClientEvent {
	JOIN_ROOM = 'joinRoom',
	LEAVE_ROOM = 'leaveRoom',
	DRIVER_SEARCH_ACCEPTED = 'driverMatched',
	DRIVER_SEARCH_REFUSED = 'driverSearchRefused',
}

export enum ServerEvent {
	DRIVER_WANTED = 'driverWanted',
	DRIVER_MATCH_CANCELLED = 'driverMatchCancelled',
	NOTIFICATION = 'notification',
}

export interface ClientToServerEvents {
	[ClientEvent.JOIN_ROOM]: (roomName: string) => void
	[ClientEvent.LEAVE_ROOM]: (roomName: string) => void
}

export interface ServerToClientEvents {
	[ServerEvent.DRIVER_WANTED]: (data: SearchDriverResponseBody) => void
	[ServerEvent.DRIVER_MATCH_CANCELLED]: (data: StopSearchDriverBody) => void
	[ServerEvent.NOTIFICATION]: (data: NotificationBody) => void
}

export type CustomWebSocket = Socket<ServerToClientEvents, ClientToServerEvents>
