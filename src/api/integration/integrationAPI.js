import { INTEGRATION_EP } from './integrationEP'
import { NotificationManager} from 'react-notifications';
import { getToken } from '../../auth'
import { apiError, returnFiltersJson } from '../UtilsAPI'

export const getPageConfig = async () => {
	return await fetch(INTEGRATION_EP.getFilter(), {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	})
	.then(async response => {
		if (response.status === 200) {
			return await response.json().then((responseJson) => {
				return responseJson
			})
		} else {
			let then = await apiError(response)
			NotificationManager.error(then[0])
			return then[1]
		}
	})
}

export const getDataPanel = async (dataFilter) => {
	console.log(dataFilter)
	let dataJson = await returnFiltersJson(dataFilter)
	return await fetch(INTEGRATION_EP.integration(), 
	{
		method: 'POST',
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataJson)
	})
	.then(async response => {
		if (response.status === 200) {
			return await response.json().then((responseJson) => {
				return responseJson
			})
		}
		else {
			let then = await apiError(response)
			NotificationManager.error(then[0])
			return then[1]
		}
	})
	.catch(error => {
		console.log(error)
	})
}

export const putReinstate = async (dataIntegration) => {
	return await fetch(INTEGRATION_EP.reinstate(), 
	{
		method: 'PUT', 
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataIntegration)
	})
	.then(async response => {
		if (response.status === 200) {
			return await response.json().then((responseJson) => {
				return responseJson
			})
		}
		else {
			let then = await apiError(response)
			NotificationManager.error(then[0])
			return then[1]
		}
	})
	.catch(error => {
		console.log(error)
	})
}