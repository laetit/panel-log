import { ENDPOINTS } from '../endpoints'

export const INTEGRATION_EP = {
	integration() {return ENDPOINTS.vm_panel() + 'api/report'},
	reinstate(){ return ENDPOINTS.vm_panel() + 'api/reinstate'},
	getFilter(){ return ENDPOINTS.vm_panel() + 'api/fields'}
}
