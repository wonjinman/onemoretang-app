export enum FreightStatus {
	MATCHING = 'MATCHING',
	MATCHED = 'MATCHED',
	EMBARKED = 'EMBARKED',
	LOADING = 'LOADING',
	DELIVERING = 'DELIVERING',
	LANDING = 'LANDING',
	DELIVERED = 'DELIVERED',
}

export const KorFreightStatusMap = new Map<FreightStatus, string>([
	[FreightStatus.MATCHING, '배차 중'],
	[FreightStatus.MATCHED, '배차 완료'],
	[FreightStatus.EMBARKED, '운송 출발'],
	[FreightStatus.LOADING, '상차 중'],
	[FreightStatus.DELIVERING, '운행 중'],
	[FreightStatus.LANDING, '하차 중'],
	[FreightStatus.DELIVERED, '운송 완료'],
])
