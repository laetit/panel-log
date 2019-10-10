import { NotificationManager} from 'react-notifications';
import { ENDPOINTS } from '../endpoints'

export const setLogin = async (userLogin) => {
	let resposta = await fetch(ENDPOINTS.login(),
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userLogin)
	})
	if (resposta.status !== 200){
		if (resposta.status === 401){
			NotificationManager.error('Usuario e senha invalido')
		} else {
			NotificationManager.error(resposta.status, 'Erro')
		}
		return 'error'
	} else {
		return await resposta.json()
	}
}