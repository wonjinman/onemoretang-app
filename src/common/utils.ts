import moment from 'moment'
import { Alert, Linking } from 'react-native'
import * as turf from '@turf/turf'
import { round } from 'lodash'
import { LatLng } from './domain/types/LatLng'

export const formatNumberWithCommas = (x: number) => {
	return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const convertMillisecondToHHMMSS = (milliseconds: number) => {
	const seconds = Math.floor(milliseconds / 1000) % 60
	const minutes = Math.floor(milliseconds / (1000 * 60)) % 60
	const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24
	const hour = hours < 10 ? '0' + hours : hours
	const minute = minutes < 10 ? '0' + minutes : minutes
	const second = seconds < 10 ? '0' + seconds : seconds

	if (hour == '00') {
		return `${minute}분 ${second}초`
	}
	return `${hour}시 ${minute}분 ${second}초`
}

export function toArray<T>(candidate?: T | T[] | false): T[] {
	if (candidate === undefined || candidate === false) return []

	return Array.isArray(candidate) ? candidate : [candidate]
}

export const convertDateStringToYYYYMMDD = (date: string | null) => {
	if (!date) return ''
	if (date === 'Invalid date') return ''
	return moment(date).format('YYYY-MM-DD')
}

export const alertWithDoubleCheck = (title: string, message: string, onOk: () => void) => {
	Alert.alert(title, message, [
		{ text: '확인', onPress: onOk },
		{ text: '취소', style: 'destructive' },
	])
}

export const getPointToPointDistanceInKilometers = (
	fromLatitude?: number,
	fromLongitude?: number,
	toLatitude?: number,
	toLongitude?: number,
): number | null => {
	if (!fromLatitude || !fromLongitude || !toLatitude || !toLongitude) {
		return null
	}
	const fromPoint = turf.point([fromLongitude, fromLatitude])
	const toPoint = turf.point([toLongitude, toLatitude])
	return round(turf.distance(fromPoint, toPoint, { units: 'kilometers' }))
}

export const getLatLngToLatLngDistanceInKilometers = (
	latlngA: LatLng | null,
	latlngB: LatLng | null,
): number | null =>
	getPointToPointDistanceInKilometers(
		latlngA?.latitude,
		latlngA?.longitude,
		latlngB?.latitude,
		latlngB?.longitude,
	)

export const falseFirstSorter = (a: boolean, b: boolean) => Number(a) - Number(b)
export const trueFirstSorter = (a: boolean, b: boolean) => Number(a) - Number(b)

export const extractSidoFromAddress = (address: string | undefined) =>
	address ? address.split(' ').slice(0, 2).join(' ') : ''

export const formatRegistrationNumber = (registrationNumber: string) =>
	registrationNumber?.length !== 10
		? registrationNumber
		: registrationNumber.slice(0, 3) +
		  '-' +
		  registrationNumber.slice(3, 5) +
		  '-' +
		  registrationNumber.slice(5, 10)

export const checkIsAfter10thDayOfNextMonth = (date: string | Date) =>
	new Date(new Date().getFullYear(), new Date(date).getMonth() + 1, 11) < new Date()

export const callToManager = (title: string, message: string, mainBrokerId?: number) => {
	let tel = '1600-0000'
	const telArr: Array<{ name: string; tel: string; brokerList: number[] }> = [
		{
			name: '누군가',
			tel: '010-0000-0000',
			brokerList: [8],
		},
	]
	if (mainBrokerId) {
		const findData = telArr.findIndex(item =>
			item.brokerList.some(brokerId => brokerId === mainBrokerId),
		)
		if (findData >= 0) tel = telArr[findData].tel
	}

	Alert.alert(title, message, [
		{
			text: '취소',
			style: 'cancel',
			onPress: () => {},
		},
		{
			text: '전화걸기',
			onPress: () => {
				Linking.openURL(`tel:${tel}`)
			},
		},
	])
}
