export enum DriverAvailability {
	AVAILABLE = 'AVAILABLE',
	DAYOFF = 'DAYOFF',
	OCCUPIED = 'OCCUPIED',
	UNIDENTIFIED = 'UNIDENTIFIED',
}

export const KorDriverAvailabilityMap = new Map<DriverAvailability, string>([
	[DriverAvailability.AVAILABLE, '일감 대기중'],
	[DriverAvailability.DAYOFF, '휴일'],
	[DriverAvailability.OCCUPIED, '운행 중'],
	[DriverAvailability.UNIDENTIFIED, '알 수 없음'],
])
