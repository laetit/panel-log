import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
	en: {
		translation: {
			"endpoint.label": "New IP",
			"endpoint.button": "REGISTER",
			"login.title": "Panels",
			"login.labelLogin": "Username",
			"login.labelPassword": "Password",
			"login.btn": "Login",
			"navmenu.title": "PANEL",
			"navmenu.integration": "Integration",
			"integration.btn.reinstate": "Reinstate",
			"integration.btn.filters": "Filters",
			"filter.initialDate": "Initial Store",
			"filter.endDate": "End Store",
			"filter.checkbox.todo": "To Integrate",
			"filter.checkbox.todo.description": "Data to be processed/sent.",
			"filter.checkbox.error": "Error",
			"filter.checkbox.error.description": "Data that was not processed/sent successfully. The system will automatically retry.",
			"filter.checkbox.fatalError": "Fail",
			"filter.checkbox.fatalError.description": "Data that was not processed/sent successfully. The system will not attempt to reprocess / resend automatically.",
			"filter.checkbox.done": "Integrated",
			"filter.checkbox.done.description": "Data already processed/sent.",
			"filter.btn.filter": "Filter",
			"grid.message.title": "Report without results",
			"grid.message.subtitle": "Search returned no results, try with other filters."
		}
	},
	pt: {
		translation: {
			"endpoint.label": "Novo IP",
			"endpoint.button": "REGISTRAR",
			"login.title": "Paineis",
			"login.labelLogin": "Usuario",
			"login.labelPassword": "Senha",
			"login.btn": "Entrar",
			"navmenu.title": "PAINEL",
			"navmenu.integration": "Integração",
			"integration.btn.reinstate": "Reintegrar",
			"integration.btn.filters": "Filtros",
			"filter.initialDate": "Loja Inicial",
			"filter.endDate": "Loja Final",
			"filter.checkbox.todo": "Integrar",
			"filter.checkbox.todo.description": "Dados a serem processados/enviados.",
			"filter.checkbox.error": "Erro",
			"filter.checkbox.error.description": "Dados que não foram processados/enviados com sucesso. O sistema automaticamente tentará novamente.",
			"filter.checkbox.fatalError": "Falha",
			"filter.checkbox.fatalError.description": "Dados que não foram processados/enviados com sucesso. O sistema não tentará reprocessar/reenviar automaticamente.",
			"filter.checkbox.done": "Integrado",
			"filter.checkbox.done.description": "Dados já processados/enviados.",
			"filter.btn.filter": "Filtrar",
			"grid.message.title": "Relatório sem resultados",
			"grid.message.subtitle": "A busca retornou nenhum resultado, tente com outros filtros."
		}
	}
}

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: "pt",
		keySeparator: false,
		interpolation: { escapeValue: false }
	})

export default i18n