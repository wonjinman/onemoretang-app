export type ReceiptImage = {
	id: number
	path: string
	createdAt: string
}

//Receipt 하나 안에 사진이 여러 개 추가될 수 있다는 가정 하에 설계
export type Receipt = {
	receiptImages: ReceiptImage[]
}
