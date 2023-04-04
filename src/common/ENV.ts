import Config from 'react-native-config'

type Profile = 'local' | 'beta' | 'prod'

const API_SERVER_BASE_URL = Config.API_SERVER_BASE_URL
const API_DOMAIN_MAIN_SPRING = Config.API_DOMAIN_MAIN_SPRING
const API_SERVERLESS_BASE_URL = Config.API_SERVERLESS_BASE_URL
const ONESIGNAL_APP_ID = Config.ONESIGNAL_APP_ID

;(function validateEnv() {
	const message = [
		['API_SERVER_BASE_URL', API_SERVER_BASE_URL],
		['ONESIGNAL_APP_ID', ONESIGNAL_APP_ID],
	]
		.filter(it => !it[1])
		.map(([name, value]) => `Invalid environment variable ${name}: ${value}`)
		.join('\n')

	if (message) {
		throw new Error(message)
	}
})()
export const ENV = {
	PROFILE: (__DEV__ ? `dev_${Config.PROFILE}` : Config.PROFILE) as Profile,
	IS_PRODUCTION: !__DEV__,
	API_SERVER_BASE_URL:
		process.env.NODE_ENV === 'test' ? 'http://localhost:8000' : `https://${API_SERVER_BASE_URL}`,
	API_SERVER_SETTLEMENT_BASE_URL:
		process.env.NODE_ENV === 'test' ? 'http://localhost:8000' : `https://${API_DOMAIN_MAIN_SPRING}`,
	SERVERLESS_BASE_URL:
		process.env.NODE_ENV === 'test'
			? 'http://localhost:8000'
			: `https://${API_SERVERLESS_BASE_URL}`,
	WEBSOCKET_SERVER_BASE_URL:
		process.env.NODE_ENV === 'test' ? 'ws://localhost:8000' : `wss://${API_SERVER_BASE_URL}`,
	SENTRY: {
		DSN: 'https://e55055be5f2f42beb0f73bfee1b38a50@o1251624.ingest.sentry.io/6417639',
	},
	ONESIGNAL_APP_ID: Config.ONESIGNAL_APP_ID,
	WEB_URL: Config.WEB_URL || '',
}
