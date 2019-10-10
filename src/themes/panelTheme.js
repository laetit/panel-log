

export const FILTER_INT = [
	{ label: 'Data Inicial', id: 'startDate', type: 'date'},
	{ label: 'Data Final', id: 'endDate', type: 'date'},
	{ label: 'PDV Inicial', id: 'startPos', type: 'number', min: 0, max: 3 },
	{ label: 'PDV Final', id: 'endPos', type: 'number' },
	{ label: 'Cupom Inicial', id: 'startCouponNumber', type: 'number', min: 0, max: 9 },
	{ label: 'Cupom Final', id: 'endCouponNumber', type: 'number', min: 0, max: 9 },
	{ label: 'Nota Inicial', id: 'startNoteNumber', type: 'number', min: 0, max: 9 },
	{ label: 'Nota Final', id: 'endNoteNumber', type: 'number', min: 0, max: 9 }
]

export const STORES_INPUT = [
	{ label: 'filter.initialDate', id: 'startStoreId', type: 'number', min: 0, max: 4, defaultValue: 1 },
	{ label: 'filter.endDate', id: 'endStoreId', type: 'number', min: 0, max: 4, defaultValue: 9999 }
]

export const CHECKBOX_STATUS = [ 
	{ text: 'filter.checkbox.todo', id: 'TODO', description: 'Dados a serem processados/enviados.' },
	{ text: 'filter.checkbox.done', id: 'DONE', description: 'Dados já processados/enviados.' },
	{ text: 'filter.checkbox.error', id: 'ERROR', description: 'Dados que não foram processados/enviados com sucesso. O sistema automaticamente tentará novamente.'},
	{ text: 'filter.checkbox.fatalError', id: 'FATAL_ERROR', description: 'Dados que não foram processados/enviados com sucesso. O sistema não tentará reprocessar/reenviar automaticamente.' }
]

export const panelIntegHeader = [
	{ label: 'Loja', key: 'store' },
	{ label: 'Data', key: 'date' },
	{ label: 'PDV', key: 'pos' },
	{ label: 'Cupom', key: 'couponNumber' },
	{ label: 'Nota', key: 'noteNumber' },
	{ label: 'Status', key: 'status' },
	{ label: 'Descrição', key: 'statusDesc' }
]

// const teste = [
// 	{
// 		"PANEL": {
// 			"store": "Loja",
// 			"date": "Data",
// 			"pos": "PDV",
// 			"couponNumber": "Cupom",
// 			...
// 		},
// 		"FILTER": [
// 			{ ...antigo formato do filter }
// 		] 
// 	}
// ]
