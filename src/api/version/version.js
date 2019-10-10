import { ENDPOINTS } from '../endpoints'


const VERSION_EP = {
	version() {return ENDPOINTS.vm_panel() + 'api/version'}
}

export const getVersion = async () => {
	return await fetch(VERSION_EP.version(), {
		method: 'GET'
	})
	.then(async response => {
		if (response.status === 200) {
			return response.text()
		} else {
			return '-'
		}
	})
}