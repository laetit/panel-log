const IP = localStorage.getItem("endpoint")
const PORT = '5035'
const MSERV = 'vm-panel/'
const AUTH = 'https://vm-auth-api.herokuapp.com'


export const ENDPOINTS = {
	login(){ return `${AUTH}/api/auth/login` },
	vm_panel() { console.log("endpoint: ",IP) 
	return `http://${IP}:${PORT}/${MSERV}`}
}
