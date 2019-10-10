import { logout } from "../auth";

export const getQueryParams = (obj) =>{
	let queryParam = ''

	Object.keys(obj).map((param) =>{
		if (param === 'integratedTypes'){
			obj[param].map((option) => {
				queryParam = `${queryParam}${param}=${option}&`
			})
		} else {
			queryParam = `${queryParam}${param}=${obj[param]}&`
		}
	})
	return queryParam
}

export const apiError = async (error) => {
	switch (error.status){
		case 401:
			let jsonError = await error.json().then((json) =>{
				return json.message
			})
			console.log(jsonError)
			logout()
			return [jsonError, 'logout']
		case 400:
			console.log("400", error)
			return ['esperando erro do back', 'error']
		case 500:
			console.log("500", error)
			return ['Erro 500', 'error']
		default:
			console.log("classificar: ",error)
			return ['Erro ainda não classificado', 'error']
		}
	}
	
const typesFilter = [ 'Double', 'Date' ]

export const returnFiltersJson = (filter) => {
	let filterJson = {
		endStoreId: filter.endStoreId,
		integratedTypes: filter.integratedTypes,
		page: filter.page,
		rows: 10,
		startStoreId: filter.startStoreId,
		values: returnValuesFilter(filter)
	}
	return filterJson
}

const isDigit = char => {
	return /\d/.test(char)
}

const filterDigits = val => {
	let finalValue = '';
	val.split('')
			.map( char => {
					finalValue += isDigit(char) ? char : ''
			})
	return finalValue
}

const removeDigits = val => {
	let finalValue = ''
	val.split('')
		.map(char => {
			finalValue += isDigit(char) ? '' : char
		})
	return finalValue
}

const filterById = (typeList, idkey, val) => {
	let typeListLen = Object.keys(typeList).length
	let someObj
	
	for(var count = 0; count < typeListLen; count++){
		var val2 = Object.keys(typeList)[count]
		var idkey2 = filterDigits(val2)
		if(idkey === idkey2){
			someObj = {...someObj, [val2]: typeList[val2]}
		}
	}
	return someObj
}

const addDbNameValues = (valuesList) => {
	let valueListReturn = []
	let dbName
	for(let type =0; type < typesFilter.length; type++){
		let value = 0
		for (value; value<valuesList.length; value++){
			if (Object.keys(valuesList[value])[0].match(/Date/) !== null){
				dbName = {dbName: `data${filterDigits(Object.keys(valuesList[value])[0])}`}
				valueListReturn.push(Object.assign(valuesList[value], dbName))
			} else if(Object.keys(valuesList[value])[0].match(/Double/) !== null) {
				dbName = {dbName: `valor${filterDigits(Object.keys(valuesList[value])[0])}`}
				valueListReturn.push(Object.assign(valuesList[value], dbName))
			}
		}
	}
	return valueListReturn
}

const returnValuesFilter = (values) => {
	console.log(values)
		let keyValues = Object.keys(values).filter(key => {
			return /\d/.test(key) ? values[key] : false
		})

		let newValues
		for (let i = 0; i<keyValues.length; i++){
			newValues = {...newValues, [keyValues[i]]: values[keyValues[i]]}
		}

		let typeList = [{},{}]
		Object.keys(newValues).map((val, id) => {
			for(let i =0; i < typesFilter.length; i++){
				if(val.includes(typesFilter[i])){
					typeList[i] = {...typeList[i], [val]: newValues[val]}
				}
			}
		})

		let doubleValueList = []
		
		for(let i = 0; i < typeList.length; i++){
			doubleValueList.push(
				...Object.keys(typeList[i]).map( val => {
				let idkey = filterDigits(val)
				
				return filterById(typeList[i], idkey, val) 
			}))
		}

	addDbNameValues(doubleValueList)

	let finalList = [...new Set(addDbNameValues(doubleValueList).map(obj => JSON.stringify(obj)))].map(i => JSON.parse(i))
	
	let finalRealList = []
	finalList.map((obj, idx) => {
		Object.keys(obj).forEach((key) => {
			if (key !== 'dbName'){
				let newKey = removeDigits(key)
				obj[newKey] = obj[key]
				delete obj[key]
			}
		})
		finalRealList.push(obj)
	})

	dataConvert(finalRealList)

	return finalRealList
} 

const dataConvert = async (data) => {
	data.map((obj, idx) => {
		if(/data/.test(obj.dbName)){
			obj.startDateValue = `${obj.startDateValue} 00:00 AM BRT`
			obj.endDateValue = `${obj.endDateValue} 00:00 AM BRT`
		}
	})
	return data
}