export enum FreightCorrectionRequestStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REFUSED = 'REFUSED',
}

export const KorFreightCorrectionRequestStatusMap = new Map<FreightCorrectionRequestStatus, string>(
	[
		[FreightCorrectionRequestStatus.PENDING, '대기 중'],
		[FreightCorrectionRequestStatus.ACCEPTED, '수락'],
		[FreightCorrectionRequestStatus.REFUSED, '거절'],
	],
)
