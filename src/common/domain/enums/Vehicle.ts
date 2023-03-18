export enum Vehicle {
	MOTORCYCLE = 'MOTORCYCLE',
	DAMAS = 'DAMAS',
	LABO = 'LABO',
	CARGO = 'CARGO',
	TOP = 'TOP',
	WINGBODY = 'WINGBODY',
}

export const KorVehicleMap = new Map<Vehicle, string>([
	[Vehicle.MOTORCYCLE, '오토바이'],
	[Vehicle.DAMAS, '다마스'],
	[Vehicle.LABO, '라보'],
	[Vehicle.CARGO, '카고'],
	[Vehicle.TOP, '탑'],
	[Vehicle.WINGBODY, '윙바디'],
])
