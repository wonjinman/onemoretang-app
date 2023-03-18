import { apiConnector } from '../../../common/connectors/api'
import { DriverProfile } from '../../domain/types'

export const fetchMyProfile = async () => {
	const response = await apiConnector.get<DriverProfile>('/accounts/driver/me')
	return response.data!
}
