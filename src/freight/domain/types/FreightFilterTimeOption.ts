import { OrderFreightEntity } from './index'
import moment, { Moment } from 'moment'

export type FreightFilterTimeOption = 'ALL' | 'WEEK' | 'MONTH_1'
// | 'MONTH_3'
export const freightFilterTimeOptionAlters: FreightFilterTimeOption[] = [
	'ALL',
	'WEEK',
	'MONTH_1',
	// 'MONTH_3',
]

export const KorFreightTimeFilterOptions: {
	[x in FreightFilterTimeOption]: [string, (entity: OrderFreightEntity, now: Moment) => boolean]
} = {
	ALL: ['전체기간', () => true],
	WEEK: [
		'1주일',
		(entity, now) => {
			return now.diff(moment(entity.loadingTime), 'day') < 7
		},
	],
	MONTH_1: [
		'1개월',
		(entity, now) => {
			return now.diff(moment(entity.loadingTime), 'month') < 1
		},
	],
	/*MONTH_3: [
		'3개월',
		(entity, now) => {
			return now.diff(moment(entity.loadingTime), 'month') < 3
		},
	],*/
}
