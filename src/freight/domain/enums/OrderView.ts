export enum OrderView {
	WAITING_ORDERS,
	ONGOING_ORDERS,
	COMPLETED_ORDERS,
}

export const OrderViewKorMap = new Map<OrderView, string>([
	[OrderView.WAITING_ORDERS, '대기'],
	[OrderView.ONGOING_ORDERS, '진행'],
	[OrderView.COMPLETED_ORDERS, '완료'],
])
