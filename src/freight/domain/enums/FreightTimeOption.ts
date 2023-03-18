export enum FreightTimeOption {
	TODAY = 'TODAY',
	OVERNIGHT = 'OVERNIGHT',
	//TOMORROW = 'TOMORROW',
	OTHER = 'OTHER',
}

export const KorFreightTimeOptionMap = new Map<FreightTimeOption, string>([
	[FreightTimeOption.TODAY, '당상 당착'],
	[FreightTimeOption.OVERNIGHT, '야상 내착'],
	//[FreightTimeOption.TOMORROW, '내상 내착'],
	[FreightTimeOption.OTHER, '예약'],
])
