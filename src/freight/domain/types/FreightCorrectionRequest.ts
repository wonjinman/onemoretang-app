import { TimeStampMixin } from '../../../common/domain/types/TimeStampMixin'
import { FreightCorrectionRequestStatus } from '../enums'
import { FreightCorrectionTargetColumn } from '../enums/FreightCorrectionTargetColumn'

export interface FreightCorrectionRequest extends TimeStampMixin {
	id: number
	freightId: number
	status: FreightCorrectionRequestStatus
	targetColumn: FreightCorrectionTargetColumn
	correctedValue: string
	statusChangedAt: string | null
}
